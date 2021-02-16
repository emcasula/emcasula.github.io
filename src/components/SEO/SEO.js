import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Facebook from './Facebook'
import picture from '../../assets/img/nutrizionista-emanuela-casula-cagliari.jpg';

// Complete tutorial: https://www.gatsbyjs.org/docs/add-seo-component/

const SEO = ({ title, desc, banner, pathname, article, node }) => {
    const { site } = useStaticQuery(query)

    const {
        buildTime,
        siteMetadata: {
            siteUrl,
            defaultTitle,
            defaultDescription,
            defaultBanner,
            headline,
            siteLanguage,
            ogLanguage,
            author,
            facebook,
        },
    } = site

    const seo = {
        title: title || defaultTitle,
        description: desc || defaultDescription,
        image: `${siteUrl}${banner || defaultBanner}`,
        url: `${siteUrl}${pathname || ''}`,
    }

    // schema.org in JSONLD format
    // https://developers.google.com/search/docs/guides/intro-structured-data
    // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')
    const schemaOrgBusiness = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "MedicalBusiness",
                "@id": "http://nutrizionistaemanuelacasula.it/#organization",
                name: "Nutrizionista Emanuela Casula",
                url: "https://nutrizionistaemanuelacasula.it",
                telephone: "+393515159912",
                priceRange: "€€",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Via Stanislao Caboni 10",
                    addressLocality: "Cagliari",
                    postalCode: "09044",
                    addressCountry: "IT"
                },
                geo: {
                    "@type": "GeoCoordinates",
                    latitude: 39.211747,
                    longitude: 9.128624
                },
                "sameAs": [
                    "https://www.facebook.com/nutrizionistaemanuelacasula",
                    "https://www.instagram.com/nutrizionista_emanuela_casula/"
                ],
                image: [
                    picture,
                ],
                currenciesAccepted: "EUR",
                paymentAccepted: "Cash, Credit Card",
            },
            {
                "@type": "ImageObject",
                "@id": "http://nutrizionistaemanuelacasula.it/#primaryimage",
                "inLanguage": "it-IT",
                "url": picture,
                "width": 801,
                "height": 801,
                "caption": "biologa nutrizionista a cagliari"
              },
            {
                "@type": "WebSite",
                "@id": "https://nutrizionistaemanuelacasula.it/#website",
                "url": "hhttps://nutrizionistaemanuelacasula.it",
                "name": "Biologa nutrizionista Cagliari, nutrizione sportiva",
                "description": "Biologa nutrizionista Cagliari",
                "publisher": {
                    "@id": "https://nutrizionistaemanuelacasula.it"
                },
                "inLanguage": "it-IT"
            },
        ],
    }

    const schemaOrgWebPage = {
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        url: siteUrl,
        headline,
        inLanguage: siteLanguage,
        mainEntityOfPage: siteUrl,
        description: defaultDescription,
        name: defaultTitle,
        author: {
            '@type': 'Person',
            name: author,
        },
        copyrightHolder: {
            '@type': 'Person',
            name: author,
        },
        copyrightYear: '2021',
        creator: {
            '@type': 'Person',
            name: author,
        },
        publisher: {
            '@type': 'Person',
            name: author,
        },
        datePublished: '2021-01-10T10:30:00+01:00',
        dateModified: buildTime,
        image: {
            '@type': 'ImageObject',
            url: `${siteUrl}${defaultBanner}`,
        },
    }

    // Initial breadcrumb list

    const itemListElement = [
        {
            '@type': 'ListItem',
            item: {
                '@id': siteUrl,
                name: 'Homepage',
            },
            position: 1,
        },
    ]

    let schemaArticle = null

    if (article) {
        schemaArticle = {
            '@context': 'http://schema.org',
            '@type': 'Article',
            author: {
                '@type': 'Person',
                name: author,
            },
            copyrightHolder: {
                '@type': 'Person',
                name: author,
            },
            copyrightYear: '2021',
            creator: {
                '@type': 'Person',
                name: author,
            },
            publisher: {
                '@type': 'Organization',
                name: author,
                logo: {
                    '@type': 'ImageObject',
                    url: `${siteUrl}${defaultBanner}`,
                },
            },
            //TODO
            //datePublished: node.first_publication_date,
            //dateModified: node.last_publication_date,
            description: seo.description,
            headline: seo.title,
            inLanguage: siteLanguage,
            url: seo.url,
            name: seo.title,
            image: {
                '@type': 'ImageObject',
                url: seo.image,
            },
            mainEntityOfPage: seo.url,
        }
        // Push current blogpost into breadcrumb list
        itemListElement.push({
            '@type': 'ListItem',
            item: {
                '@id': seo.url,
                name: seo.title,
            },
            position: 2,
        })
    }

    const breadcrumb = {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        description: 'Breadcrumbs list',
        name: 'Breadcrumbs',
        itemListElement,
    }

    return (
        <>
            <Helmet title={seo.title}>
                <html lang={siteLanguage} />
                <meta name="description" content={seo.description} />
                <meta name="image" content={seo.image} />
                <meta name="gatsby-starter" content="Gatsby Starter Prismic" />
                {/* Insert schema.org data conditionally (webpage/article) + everytime (breadcrumbs) */}
                {<script type="application/ld+json">{JSON.stringify(schemaOrgBusiness)}</script>}
                {!article && <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>}
                {article && <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>}
                <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
            </Helmet>
            <Facebook
                desc={seo.description}
                image={seo.image}
                title={seo.title}
                type={article ? 'article' : 'website'}
                url={seo.url}
                locale={ogLanguage}
                name={facebook}
            />
        </>
    )
}

export default SEO

SEO.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    banner: PropTypes.string,
    pathname: PropTypes.string,
    article: PropTypes.bool,
    node: PropTypes.object,
}

SEO.defaultProps = {
    title: null,
    desc: null,
    banner: null,
    pathname: null,
    article: false,
    node: null,
}

const query = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        siteUrl
        defaultTitle: title
        defaultDescription: description
        defaultBanner: banner
        headline
        siteLanguage
        ogLanguage
        author
        facebook
      }
    }
  }
`