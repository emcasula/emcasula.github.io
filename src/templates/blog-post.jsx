import React from "react"
import Layout from "../components/Layout"

export default function Template({ data }) {
    const { markdownRemark: post } = data

    return (
        <Layout fullMenu>
            <article id="main" role="main">
                <header>
                    <h1>{post.frontmatter.title}</h1>
                    <p><a href="/ChiSono/">Emanuela Casula — Biologa Nutrizionista</a></p>
                    <p>Pubblicato il <time dateTime={post.datePublished}>{post.frontmatter.date}</time></p>
                    {post.dateModified && <p>Ultima revisione: <time dateTime={post.dateModified}>{post.modifiedLabel}</time></p>}
                </header>
                <section className="wrapper style5">
                    <div className="inner">

                        <div className="blog-post-container">
                            <div className="blog-post">
                                <div
                                    className="blog-post-content"
                                    dangerouslySetInnerHTML={{ __html: post.html }}
                                />
                                <p className="small-note">Le informazioni hanno finalità divulgativa e non sostituiscono una valutazione professionale individuale.</p>
                                <nav className="related-reading" aria-label="Approfondimenti correlati"><h2>Per approfondire</h2><ul><li><a href="/nutrizione-sportiva-cagliari/">Nutrizione sportiva</a></li><li><a href="/valutazione-composizione-corporea-cagliari/">Valutazione della composizione corporea</a></li><li><a href="/prima-visita-nutrizionista-cagliari/">Come si svolge la prima visita</a></li></ul></nav>
                            </div>
                        </div>
                    </div>
                </section>
            </article>
        </Layout>
    )
}
