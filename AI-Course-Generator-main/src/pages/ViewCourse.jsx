import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeftIcon,
  PencilIcon,
  BookOpenIcon,
  ClockIcon,
  UsersIcon,
  ChevronRightIcon,
  AcademicCapIcon,
  BeakerIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  LanguageIcon,
  BriefcaseIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { getTechLogo } from "../utils/getTechLogo.jsx"; // We'll create this utility

const ViewCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChapter, setActiveChapter] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/courses/${id}`  // Changed from /course/:id to /courses/:id
        );
        setCourse(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course:", error);
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return <LoadingState />;
  }

  if (!course) {
    return <ErrorState />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <button
              onClick={() => navigate("/course")}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Courses
            </button>
            <button
              onClick={() => navigate(`/course/create/${id}`)}
              className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <PencilIcon className="w-4 h-4" />
              <span>Edit Course</span>
            </button>
          </div>
        </div>
      </header>

      {/* Course Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 transform translate-x-1/4 -translate-y-1/4 opacity-10">
            {getTechLogo(course.courseTitle)}
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">{course.courseTitle}</h1>
              <p className="text-lg text-indigo-100 mb-6">
                {course.courseDescription}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="w-5 h-5" />
                    <span>{course.courseDuration || "Self-paced"}</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CurrencyDollarIcon className="w-5 h-5" />
                    <span>${course.coursePrice || 'Free'}</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <LanguageIcon className="w-5 h-5" />
                    <span>{course.courseLanguages?.[0] || 'English'}</span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <BriefcaseIcon className="w-5 h-5" />
                    <span>${course.salaryRange?.min}k - ${course.salaryRange?.max}k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Requirements */}
            {course.courseRequirements?.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {course.courseRequirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Course Content/Chapters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Course Content</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {course.courseContent?.length || 0} chapters
                </p>
              </div>
              <div className="divide-y divide-gray-200">
                {course.courseContent?.map((content, index) => (
                  <div key={index} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Chapter {index + 1}: {content.chapter.name}
                      </h3>
                    </div>
                    
                    {/* Subtopics */}
                    {content.chapter.subTopics?.length > 0 && (
                      <div className="ml-4 space-y-3">
                        {content.chapter.subTopics.map((subtopic, sIndex) => (
                          <div key={sIndex} className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">{subtopic.name}</h4>
                            <p className="text-gray-600 text-sm">{subtopic.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quiz */}
                    {content.chapter.quiz && (
                      <div className="mt-4 ml-4 bg-blue-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">{content.chapter.quiz.name}</h4>
                        <div className="space-y-4">
                          {content.chapter.quiz.questions?.map((quiz, qIndex) => (
                            <div key={qIndex} className="bg-white rounded-lg p-4">
                              <p className="font-medium text-gray-900 mb-3">
                                Q{qIndex + 1}: {quiz.question}
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {quiz.options?.map((option, oIndex) => (
                                  <div 
                                    key={oIndex} 
                                    className={`p-3 rounded-lg border ${
                                      option.isCorrect 
                                        ? 'border-green-200 bg-green-50' 
                                        : 'border-gray-200'
                                    }`}
                                  >
                                    {option.option}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Outcomes */}
            {course.courseOutcome?.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">What you'll learn</h3>
                <ul className="space-y-3">
                  {course.courseOutcome.map((outcome, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Course Benefits */}
            {course.courseBenefits?.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Benefits</h3>
                <ul className="space-y-3">
                  {course.courseBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
  </div>
);

const ErrorState = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Course Not Found</h2>
      <p className="text-gray-600 mb-4">The course you're looking for doesn't exist.</p>
      <button
        onClick={() => navigate("/course")}
        className="text-indigo-600 hover:text-indigo-800"
      >
        Go back to courses
      </button>
    </div>
  </div>
);

export default ViewCourse;
