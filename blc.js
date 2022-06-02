const blc = require("broken-link-checker");

const linkExtRe = new RegExp("https?://.*/[^/]+\\.[a-z]+$");
const trailingSlashRe = new RegExp("/$");

var options = {
  excludedKeywords: ["/assets"],
};

const linkCheckMode =
  process.argv.slice(2) == "" ? "all" : process.argv.slice(2);

if (linkCheckMode == "internal") {
  options.excludeExternalLinks = true;
} else if (linkCheckMode == "external") {
  options.excludeInternalLinks = true;
}

var siteUrl = "http://localhost:8080";
var customData = {
  outputGoodLinks: false,
  normalizeUrls: true,
  brokenLinks: [],
  firstLink: true,
  pageLinkCount: 0,
  pageExcludedCount: 0,
  pageBrokenCount: 0,
  totalLinkCount: 0,
  totalExcludedCount: 0,
  totalBrokenCount: 0,
  totalPageCount: 0,
};

function summarizeBrokenLinks(customData) {
  var brokenLinkMap = new Map();
  for (const result of customData.brokenLinks) {
    var linkUrl;
    var pageUrl;
    if (customData.normalizeUrls) {
      linkUrl = normalizeUrl(result.url.resolved);
      pageUrl = normalizeUrl(result.base.resolved);
    } else {
      linkUrl = result.url.resolved;
      pageUrl = result.base.resolved;
    }
    var pageLinkMap;
    if (!brokenLinkMap.has(linkUrl)) {
      pageLinkMap = new Map();
      pageLinkMap.set(pageUrl, 1);
      brokenLinkMap.set(linkUrl, pageLinkMap);
    } else {
      pageLinkMap = brokenLinkMap.get(linkUrl);
      if (!pageLinkMap.has(pageUrl)) {
        pageLinkMap.set(pageUrl, 1);
      } else {
        pageLinkMap.set(pageUrl, pageLinkMap.get(pageUrl) + 1);
      }
    }
  }
  return brokenLinkMap;
}

function normalizeUrl(url) {
  if (!linkExtRe.test(url) && !trailingSlashRe.test(url)) {
    url += "/";
  }
  return url;
}

var siteChecker = new blc.SiteChecker(options, {
  robots: function (robots, customData) {},
  html: function (tree, robots, response, pageUrl, customData) {},
  junk: function (result, customData) {},
  link: function (result, customData) {
    if (customData.firstLink) {
      customData.firstLink = false;
    }
    if (result.broken) {
      if (
        result.http.response == null ||
        result.http.response.statusCode !== 429
      ) {
        customData.brokenLinks.push(result);
        customData.pageBrokenCount++;
      }
    } else if (result.excluded) {
      customData.pageExcludedCount++;
    } else {
      if (customData.outputGoodLinks) {
      }
    }
    customData.pageLinkCount++;
  },
  page: function (error, pageUrl, customData) {
    if (customData.pageLinkCount > 0) {
      customData.totalLinkCount += customData.pageLinkCount;
      customData.totalExcludedCount += customData.pageExcludedCount;
      customData.totalBrokenCount += customData.pageBrokenCount;
      customData.pageLinkCount = 0;
      customData.pageExcludedCount = 0;
      customData.pageBrokenCount = 0;
    }
    customData.firstLink = true;
    customData.totalPageCount++;
  },
  site: function (error, siteUrl, customData) {
    if (customData.totalLinkCount > 0) {
      console.log();
      console.log("Всего страниц просканировано: " + customData.totalPageCount);
      console.log();
      console.log("Всего рабочих ссылок найдено: " + customData.totalLinkCount);
      console.log();
      if (customData.totalBrokenCount > 0) {
        console.log(
          "Всего не рабочих ссылок ссылок: " + customData.totalBrokenCount
        );
        var brokenMap = summarizeBrokenLinks(customData);
        for (const [outerKey, outerValue] of brokenMap.entries()) {
          console.log("");
          console.log("Не рабочая ссылка: " + outerKey);
          for (const [innerKey, innerValue] of outerValue.entries()) {
            console.log(
              " Найдена на страницах: " + innerKey + " (" + innerValue + ")"
            );
          }
        }
        this.fail = true;
      } else {
        console.log("Всего не рабочих ссылок: " + customData.totalBrokenCount);
        this.fail = false;
      }
      console.log();
    } else {
      console.log("No links found.");
    }
  },
});

siteChecker.enqueue(siteUrl, customData);
