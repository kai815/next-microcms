import styles from '../styles/Home.module.scss'

export default function BlogId({blog}) {
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>{blog.title}</h1>
        <p className={styles.publishedAt}>{blog.publishedAt}</p>
        <p className={styles.category}>{blog.category && `${blog.category.name}`}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: `${blog.body}`,
          }}
          className={styles.post}
        />
      </main>
    );
  }


export const getStaticPaths = async () => {
  const Page = ({ content }) => {
    if (!content) {
      return <ErrorPage />;
    }
  }
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const data = await fetch('https://hideo.microcms.io/api/v1/blog', key)
    .then(res => res.json())
    .catch(() => null);

  const paths = data.contents.map(content => `/blog/${content.id}`);
  return {paths, fallback: false};
};

export const getStaticProps = async (context) => {
  const slug = context.params?.slug;
  const draftKey = context.previewData?.draftKey;
  const content = await fetch(
  `https://hideo.microcms.io/api/v1/blog/${slug}${
    draftKey !== undefined ? `?draftKey=${draftKey}` : ''
  }`,
  { headers: { 'X-API-KEY': process.env.API_KEY || '' } }
  )
  .then((res) => res.json());
  return {
    props: {
      content
    }
  };
};
