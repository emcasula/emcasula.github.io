import React from "react"
import Layout from "../components/Layout"


export default function Index({ data }) {
    const { edges: posts } = data.allMarkdownRemark
    const lastPost = posts[posts.length - 1] 

    return (
        <Layout fullMenu>
            <article id="main" role="main">
                <header>
                    <h1>Blog</h1>
                </header>
                <section className="wrapper style5">
                    <div className="inner">

                        {posts.length === 0 && <p>Non ci sono ancora articoli pubblicati.</p>}
                        {posts
                            .filter(post => post.node.frontmatter.title.length > 0)
                            .map(({ node: post }) => {
                                return (
                                    <div className="blog-post-preview" key={post.id}>
                                        <h2>
                                            <a href={post.frontmatter.path}>{post.frontmatter.title}</a>
                                        </h2>
                                        <p>{post.frontmatter.date}</p>
                                        <p>{post.excerpt}</p>
                                        {post.id !== lastPost?.node.id ? <hr /> : <></>}
                                    </div>

                                )
                            })}

                    </div>
                </section>
            </article>
        </Layout>
    )
}
