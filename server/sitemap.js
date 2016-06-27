sitemaps.add('/sitemap.xml', function() {
    // required: page
    // optional: lastmod, changefreq, priority, xhtmlLinks, images, videos
    return [
        { page: '/', lastmod: '2016-06-24', changefreq: 'yearly', priority: 0.8},
        { page: '/pricing', lastmod: '2016-06-24', changefreq: 'yearly', priority: 0.8},
        { page: '/program', lastmod: '2016-06-24', changefreq: 'yearly', priority: 0.8},
        { page: '/about-the-company', lastmod: '2016-06-24', changefreq: 'yearly', priority: 0.8},
        { page: '/blog', lastmod: '2016-06-24', changefreq: 'monthly', priority: 0.8},
        { page: '/schedule', lastmod: '2016-06-24', changefreq: 'daily', priority: 0.5},
        { page: '/account-info', lastmod: '2016-06-24', changefreq: 'yearly', priority: 0.6},
        { page: '/account-info/edit', lastmod: '2016-06-24', changefreq: 'yearly', priority: 0.5},
        { page: '/account-info/edit/change-password', lastmod: '2016-06-24', changefreq: 'yearly', priority: 0.6},
        { page: '/account-info/edit/change-email', lastmod: '2016-06-24', changefreq: 'yearly', priority: 0.6},
        { page: '/reset-password', lastmod: '2016-06-24', changefreq: 'yearly', priority: 0.1},
        { page: '/student-roster', lastmod: '2016-06-24', changefreq: 'yearly', priority: 0.1},
        { page: '/buy-credits', lastmod: '2016-06-24', changefreq: 'monthly', priority: 0.9}/*,
        { page: '/x', lastmod: new Date() },
        { page: '/y', lastmod: new Date(), changefreq: 'monthly' },
        { page: '/z', lastmod: new Date().getTime(), changefreq: 'monthly', priority: 0.8 },
        // https://support.google.com/webmasters/answer/178636?hl=en
        { page: '/pageWithViedeoAndImages',
            images: [
                { loc: '/myImg.jpg', },        // Only loc is required
                { loc: '/myOtherImg.jpg',      // Below properties are optional
                caption: "..", geo_location: "..", title: "..", license: ".."}
            ],
            videos: [
                { loc: '/myVideo.jpg', },      // Only loc is required
                { loc: '/myOtherVideo.jpg',    // Below properties are optional
                thumbnail_loc: "..", title: "..", description: ".." etc }
            ]
        },
        // https://support.google.com/webmasters/answer/2620865?hl=en
        { page: 'lang/english', xhtmlLinks: [
            { rel: 'alternate', hreflang: 'de', href: '/lang/deutsch' },
            { rel: 'alternate', hreflang: 'de-ch', href: '/lang/schweiz-deutsch' },
            { rel: 'alternate', hreflang: 'en', href: '/lang/english' }
        ]}*/
    ];
});