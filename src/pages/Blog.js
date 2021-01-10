import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"


export default function Index({ data }) {
    const { edges: posts } = data.allMarkdownRemark
    const lastPost = posts[posts.length - 1] 

    return (
        <Layout>
            <article id="main">
                <header>
                    <h2>Blog</h2>
                </header>
                <section className="wrapper style5">
                    <div className="inner">

                        {posts
                            .filter(post => post.node.frontmatter.title.length > 0)
                            .map(({ node: post }) => {
                                return (
                                    <div className="blog-post-preview" key={post.id}>
                                        <h2>
                                            <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                                        </h2>
                                        <p>{post.frontmatter.date}</p>
                                        <p>{post.excerpt}</p>
                                        {post.id !== lastPost.node.id ? <hr /> : <></>}
                                    </div>

                                )
                            })}

                    </div>
                </section>
            </article>
        </Layout>
    )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY", locale: "it")
            path
          }
        }
      }
    }
  }
`