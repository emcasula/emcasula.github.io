import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO/SEO"
import config from '../../config'

export default function Template({ data }) {
    const { markdownRemark: post } = data

    return (
        <Layout customSEO>
            <SEO
                title={`${post.frontmatter.title} | ${config.titleAlt}`}
                //pathname={location.pathname}
                //desc={data.description}
                //node={prismicPost}
                //TODO
                article
            />
            <article id="main">
                <header>
                    <h2>{post.frontmatter.title}</h2>
                </header>
                <section className="wrapper style5">
                    <div className="inner">

                        <div className="blog-post-container">
                            <div className="blog-post">
                                <div
                                    className="blog-post-content"
                                    dangerouslySetInnerHTML={{ __html: post.html }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </article>
        </Layout>
    )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "DD MMMM YYYY", locale: "it")
        path
        title
        cover
      }
    }
  }
`