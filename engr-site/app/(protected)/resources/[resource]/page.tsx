import {
  fetchFileById,
  FetchedFileData,
} from "@/actions/fetching/fetchFileById";
import { fetchLinkById } from "@/actions/fetching/fetchLinkById";
import { fetchSimilarFilesByTags } from "@/actions/fetching/fetchSimilarFilesByTags";
import { fetchSimilarLinksByTags } from "@/actions/fetching/fetchSimilarLinksByTags";

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
import { Textarea, Button } from "@mantine/core";

type FilePageProps = {
  params: { courseName: string; module: string; concept: string; file: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const ResourcePage = async ({ searchParams }: FilePageProps) => {
  const id = searchParams.id as string;
  const searchParamType = searchParams.type;

  let result;
  let similarItems: FetchedFilesDataArray | FetchedLinksDataArray | null = null;

  if (searchParamType === "file") {
    result = await fetchFileById({ id });
  } else if (searchParamType === "link") {
    result = (await fetchLinkById({ id })) as FetchedLinkData;
  } else {
    return notFound();
  }

  //* fetching similar files or links
  if (result && result.success && result.success.tags) {
    console.log(result.success.tags);

    if (result.success?.tags?.length > 0) {
      similarItems =
        searchParamType === "file"
          ? await fetchSimilarFilesByTags({
              fileId: id,
              tags: result.success.tags,
            })
          : await fetchSimilarLinksByTags({
              linkId: id,
              tags: result.success.tags,
            });
      console.log(similarItems);
    }

    console.log(result.success);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2em" }}>
      {result?.success && (
        <>
          {searchParamType === "file" && (
            <DisplayFile file={result.success as FetchedFile} />
          )}
          {searchParamType === "link" && (
            <DisplayLink link={result.success as FetchedLink} />
          )}
        </>
      )}
      <div>
        <h3>Similar resources </h3>
        <div style={{ display: "flex", gap: "1em" }}>
          {similarItems?.success?.map((item, idx) => (
            <div key={idx}>
              {searchParamType === "file" && (
                <SimilarDoc file={item as FetchedFile} />
              )}
              {searchParamType === "link" && (
                <SimilarLink link={item as FetchedLink} />
              )}
            </div>
          ))}
        </div>
      </div>
      <h3>Comments</h3>
      <div style={{ maxWidth: "600px" }}>
        <Textarea autosize minRows={2} mb="md" />
        <Button variant="filled" style={{ width: "100%" }}>
          Post
        </Button>{" "}
      </div>
    </div>
  );
};

export default ResourcePage;
