import { Fragment } from "react";
import { ApprovedPages } from "../components/pages/approved-pages/approved-pages";
import Head from "next/head";


export default function AllApprovedPages(){

    return (
        <Fragment>
            <Head>
                <title>CollegeShaala Blogs, All about Indian engineering college and degrees</title>
                <meta name="description" content="Know the Scope in Degrees of different streams in B.tech like Computer science, Electronics. Take a guided decision around how to choose college, compare different colleges and many more." />
            </Head>
            <ApprovedPages/>
        </Fragment>
    )
}