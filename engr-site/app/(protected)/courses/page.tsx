import Link from "next/link";
import { FetchedFormattedData } from "@/utils/types";
import { CourseCard } from "@/components/mantine";
import "./page.css";
import { FormattedData } from "@/utils/formatting";
import { fetchCourses } from "@/actions/fetching/courses/fetchCourses";

const Courses = async () => {
  const courseData: FetchedFormattedData = await fetchCourses();

  if (courseData?.failure) {
    console.log("bad stuff");
  }

  console.log("--courseData: ", courseData);

  return (
    <div>
      <p style={{ fontSize: "25px", textAlign: "center", padding: "30px" }}>
        Courses
      </p>

      <div className="grid-container">
        {courseData?.success?.map((item: FormattedData) => (
          <CourseCard
            title={item.name}
            description="description here"
            href={`/courses/${item.url}`}
          />
        ))}
      </div>

      {courseData?.failure && <div>No courses</div>}
    </div>
  );
};

export default Courses;
