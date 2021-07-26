// @flow strict
import { useStaticQuery, graphql } from 'gatsby';

const useLatestList = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query LastestListQuery {
        allMarkdownRemark(
          sort: {order: DESC, fields: frontmatter___date}, 
          limit: 6,
          filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
        ) {
          edges {
            node {
              frontmatter {
                date
                description
                slug
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );

  return allMarkdownRemark || {};
};

export default useLatestList;
