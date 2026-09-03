import React from "react"
import Layout from "../components/Layout"

export default function Template({ data }) {
    const { markdownRemark: post } = data

    return (
        <Layout>
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
