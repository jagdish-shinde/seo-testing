import { SITEMAP_XML_CONTAINS_URL } from "../util/constants";
import axios from "axios";

const Sitemap = () => null;

export const getServerSideProps = async ({ res }) => {
  // making server side call to get xml data when this page is loaded
  try {
  // Fetch data and build page content ...
    const headers = {'Accept': 'application/xml'}
    const content = await axios.get(
        SITEMAP_XML_CONTAINS_URL,
        {headers}
    )
    res.setHeader("Content-Type", "application/xml");
    res.write(content?.data);
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
