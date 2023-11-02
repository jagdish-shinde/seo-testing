import { generateSiteMap } from "../util/helper";
import {getApprovedPages} from '../apis/seo-page/get-approved-pages'

const Sitemap = () => null;

export const getServerSideProps = async ({ res }) => {
  // making server side call to get xml data when this page is loaded
  try {
  // Fetch data and build page content ...
    const seoPages = await getApprovedPages()
    const content = generateSiteMap(seoPages)
    res.setHeader("Content-Type", "application/xml");
    res.write(content);
    res.end();
    return {
        props: {},
    };
  } catch (error) {
    console.error('Error fetching sitemap XML:', error?.message || error);
    return {
      props: {},
    };
  }
};

export default Sitemap;
