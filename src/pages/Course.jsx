import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ClockIcon,
  UsersIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  BookOpenIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import { getTechLogo } from "../utils/getTechLogo.jsx";

const Course = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCreateCourse = () => {
    navigate("/course/create");
  };

  const getCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/courses`
      );
      const data = response.data;
      setCourses(data.data || []);
    } catch (error) {
      console.log("Error", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const CourseCard = ({ course }) => (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 hover:-translate-y-0.5">
      {/* Reduced height from h-36 to h-28 */}
      <div className="relative h-28 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
        {/* Adjusted logo container */}
        <div className="absolute inset-0 flex items-center justify-center scale-90">
          {getTechLogo(course.courseTitle, "w-24 h-24")} {/* Reduced logo size */}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        {/* Adjusted badge positioning and size */}
        <div className="absolute top-1.5 right-1.5">
          <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-medium px-1.5 py-0.5 rounded-full">
            AI Generated
          </span>
        </div>
        <div className="absolute bottom-1.5 left-1.5">
          <div className="flex items-center space-x-0.5 text-white">
            <StarIcon className="w-3 h-3 fill-current" />
            <span className="text-[10px] font-medium">4.8</span>
          </div>
        </div>
      </div>

      {/* Course Content - More compact padding and spacing */}
      <div className="p-3"> {/* Reduced padding */}
        <div className="mb-2"> {/* Reduced margin */}
          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
            {course.courseTitle}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {course.courseDescription}
          </p>
        </div>

        {/* Course Meta - More compact layout */}
        <div className="space-y-1.5 mb-3"> {/* Reduced spacing */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-gray-500">
              <ClockIcon className="w-3 h-3" />
              <span className="text-[10px]">{course.courseDuration || "Self-paced"}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <UsersIcon className="w-3 h-3" />
              <span className="text-[10px]">1.2k students</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-500">
            <BookOpenIcon className="w-3 h-3" />
            <span className="text-[10px]">
              {course.courseContent?.length || 0} chapters
            </span>
          </div>
        </div>

        {/* Action Buttons - More compact */}
        <div className="flex items-center space-x-1.5"> {/* Reduced spacing */}
          <button
            onClick={() => navigate(`/course/view/${course._id}`)}
            className="flex-1 flex items-center justify-center space-x-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-1.5 px-2.5 rounded text-xs"
          >
            <EyeIcon className="w-3 h-3" />
            <span>View Course</span>
          </button>
          <button
            onClick={() => navigate(`/course/create/${course._id}`)}
            className="p-1.5 border border-gray-300 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 rounded transition-all duration-200"
            title="Edit Course"
          >
            <PencilIcon className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <BookOpenIcon className="w-12 h-12 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses yet</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Get started by creating your first AI-powered course. Our intelligent system will help you build comprehensive learning content.
      </p>
      <button
        onClick={handleCreateCourse}
        className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Create Your First Course</span>
      </button>
    </div>
  );

  const LoadingState = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 animate-pulse">
          <div className="h-36 bg-gray-200"></div>
          <div className="p-4">
            <div className="h-5 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-3"></div>
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header Section */}
      <div className="flex-shrink-0 p-6 bg-white border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Courses
            </h1>
            <p className="text-gray-600 mt-1">Create and manage your AI-powered courses</p>
            {!loading && courses.length > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                {courses.length} course{courses.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>
          <button
            onClick={handleCreateCourse}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Create Course</span>
          </button>
        </div>
      </div>

      {/* Main Content with Internal Scroll */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6">
          {loading ? (
            <LoadingState />
          ) : courses.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;
