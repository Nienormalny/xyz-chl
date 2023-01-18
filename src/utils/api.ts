import {createClient} from "contentful";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
    space,
    environment: "interview",
    accessToken,
});

type GetJobs = {
    contentType: string;
};

export const getJobs = async (params: GetJobs) => {
    return await client.getEntries({
        content_type: params.contentType
    }).then(res => res.items);
}