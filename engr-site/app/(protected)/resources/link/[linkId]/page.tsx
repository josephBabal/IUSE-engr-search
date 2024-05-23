import { Textarea, Button } from "@mantine/core";
import {
  fetchFileById,
  FetchedFileData,
} from "@/actions/fetching/files/fetchFileById";
import { fetchLinkById } from "@/actions/fetching/links/fetchLinkById";
import { fetchSimilarFilesByTags } from "@/actions/fetching/files/fetchSimilarFilesByTags";
import { fetchSimilarLinksByTags } from "@/actions/fetching/links/fetchSimilarLinksByTags";

import { DisplayFile } from "@/app/(protected)/_components/DisplayFile";
import { DisplayLink } from "@/app/(protected)/_components/DisplayLink";
import SimilarDoc from "@/components/custom/SimilarDoc";
import SimilarLink from "@/components/custom/SimilarLink";
import {
  FetchedFile,
  FetchedFilesDataArray,
  FetchedLink,
  FetchedLinkData,
  FetchedLinksDataArray,
} from "@/utils/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import "./page.css";

type searchParams = {
  id: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

const ResourceLinkPage = async ({
  params,
  searchParams,
}: {
  params: { linkId: string };
  searchParams: searchParams;
}) => {
  const { id } = searchParams;

  const result = await fetchLinkById({ id: id });
  let similarItems: FetchedLinksDataArray | null = null;

  //* fetching similar files or links
  if (result && result.success && result.success.tags) {
    console.log(result.success.tags);

    if (result.success?.tags?.length > 0) {
      similarItems = await fetchSimilarLinksByTags({
        linkId: id,
        tags: result.success.tags,
      });
      console.log(similarItems);
    }

    console.log(result.success);
  }

  console.log(result.success);

  return (
    <div>
      <div className="content">
        {result?.success && (
          <DisplayLink link={result.success as FetchedLink} />
        )}
      </div>

      <div style={{ paddingTop: "50px", paddingLeft: "30px" }}>
        <h3 style={{ fontSize: "25px" }}>Similar resources</h3>
        <div className="similarResourcesContainer">
          {similarItems?.success?.map((item, idx) => (
            <div key={idx}>
              <Link
                href={`/resources/${item.type}/${
                  item.urlName
                }?${new URLSearchParams({ id: item.id.toString() })}`}
                passHref
              >
                <SimilarLink link={item as FetchedLink} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <h3 style={{ paddingTop: "50px", paddingLeft: "30px", fontSize: "25px" }}>
        Comments
      </h3>
      <div style={{ maxWidth: "600px", paddingLeft: "30px" }}>
        <Textarea autosize minRows={2} mb="md" />
        <Button variant="filled" style={{ width: "100%" }}>
          Post
        </Button>{" "}
      </div>
    </div>
  );
};

export default ResourceLinkPage;