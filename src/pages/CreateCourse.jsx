import React, { useState, useEffect, useCallback } from "react";
import api from '../config/axios';
import axios from 'axios';  // Keep this import for Gemini API calls
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { message, Modal } from "antd";
import { 
  SparklesIcon, 
  DocumentTextIcon, 
  BookOpenIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";

// Components
import DynamicForm from "../components/CreateCourse/DynamicForm";
import ChapterCard from "../components/CreateCourse/ChapterCard";

const MultiStepForm = ({ totalSteps = 4 }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [adminPrompt, setAdminPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [courseData, setCourseData] = useState({
    courseTitle: "",
    courseSubtitle: "",
    courseDescription: "",
    courseDuration: "",
    courseOutcome: [],
    courseBenefits: [],
    courseRequirements: [],
    courseLanguages: [],
  });

  const [messageApi, contextHolder] = message.useMessage();
  const [editSubtopicData, setEditSubtopicData] = useState({
    chapterIndex: null,
    subtopicIndex: null,
    subtopicData: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();

  const loadingLoader = () => {
    messageApi.open({
      type: "loading",
      content: "Content is being generated...",
      duration: 0,
    });
  };

  const fetchCourse = async (id) => {
    try {
      const response = await api.get(
        `/course/${id}`  // Remove /api/v1 since it's part of the base URL
      );
      const data = response.data;
      setCourseData(data.data);
      nextStep();
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCourse(id);
    }
  }, [id]);

  const createCourse = async () => {
    try {
      // Validate required fields
      if (!courseData.courseTitle || !courseData.courseDescription) {
        messageApi.error('Course title and description are required');
        return;
      }

      loadingLoader();
      // Remove duplicate /api/v1 and use consistent endpoint
      const response = await api.post(
        `/create-course`,  // Remove /api/v1 since it's part of the base URL
        courseData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      messageApi.destroy();
      
      if (response.data && response.data.message) {
        messageApi.success(response.data.message);
      } else {
        messageApi.success("Course created successfully");
      }
      
      setTimeout(() => {
        navigate("/course");
      }, 2000);
    } catch (error) {
      console.error("Error creating course:", error);
      messageApi.destroy();
      
      if (error.response) {
        if (error.response.status === 404) {
          messageApi.error("API endpoint not found. Please check the URL.");
        } else {
          messageApi.error(error.response.data.message || "Error creating course");
        }
      } else if (error.request) {
        messageApi.error("No response from server. Please try again.");
      } else {
        messageApi.error("Error creating course. Please try again.");
      }
    }
  };

  const updateCourse = async () => {
    try {
      loadingLoader();
      const response = await api.put(
        `/course/${id}`,  // Remove /api/v1 since it's part of the base URL
        { ...courseData }
      );
      messageApi.destroy();
      messageApi.success("Course updated successfully");
      setTimeout(() => {
        navigate("/course");
      }, 2000);
    } catch (error) {
      console.error("Error updating course:", error);
      messageApi.destroy();
      if (error.code === 'ERR_NETWORK' || error.message.includes('ERR_CONNECTION_REFUSED')) {
        messageApi.error("Cannot connect to server. Please check if the backend is running.");
      } else {
        messageApi.error("Error updating course. Please try again.");
      }
    }
  };

  const generateCourseData = async () => {
    if (!adminPrompt.trim()) {
      messageApi.error("Please enter a prompt for course generation");
      return;
    }

    setIsGenerating(true);
    const outcomes = courseData.courseOutcome.join(" ");
    const benefits = courseData.courseBenefits.join(" ");
    const requirements = courseData.courseRequirements.join(" ");

    const basicSchemaData = `
    const mongoose = require("mongoose");
    const courseSchema = new mongoose.Schema({
      courseTitle: String,
      courseImage: String,
      courseSubtitle: String,
      courseDuration: String,
      courseDescription: String,
      courseOutcome: [
        {
          type: String,
        },
      ],
      courseBenefits: [
        {
          type: String,
        },
      ],
      courseRequirements: [
        {
          type: String,
        },
      ],
      courseLanguages:[
        {
            type: String,  // English, Spanish, French, etc
        }
      ],
      salaryRange: {
        min: {
          type: Number,
        },
        max: {
          type: Number,
        },
      },
      coursePrice: Number,
    });
    
    module.exports = mongoose.model("Course", courseSchema);
    
    THE ANSWER SHOULD BE IN JSON FORMAT BASED ON ABOVE SCHEMA NOTHING SHOULD BE CHANGED 
    IN THE SCHEMA AND NOTHING SHOULD BE ADDED EXTRA INSTEAD OF ABOVE SCHEMA
    ALSO THE OUTPUT SHOULD CONTAIN THE SUGGESTED DATA FOR THE COURSE IN JSON FORMAT
    `;
    const chapterSchemaData = `
const quizSchema = new mongoose.Schema({
  name: String,
  questions: [
    {
      question: String,
      options: [
        {
          option: String,
          isCorrect: Boolean,
        },
      ],
    },
  ],
  chapterId: mongoose.Schema.Types.ObjectId,
});

    const subTopicSchema = new mongoose.Schema({
        name: String,
        content: String,
        chapterId: mongoose.Schema.Types.ObjectId,
      });
      
      const chapterSchema = new mongoose.Schema({
        name: String,
        subTopics: [subTopicSchema],
        quiz: quizSchema,
        courseId: mongoose.Schema.Types.ObjectId,
      });
      
      const courseSchema = new mongoose.Schema({
       
        courseContent: [
          {
            chapter: chapterSchema,
          },
        ],
       
      });
      
    
    THE ANSWER SHOULD BE IN JSON FORMAT BASED ON ABOVE SCHEMA NOTHING SHOULD BE CHANGED 
    IN THE SCHEMA AND NOTHING SHOULD BE ADDED EXTRA INSTEAD OF ABOVE SCHEMA
    ALSO THE OUTPUT SHOULD CONTAIN THE SUGGESTED DATA FOR THE CHAPTERS IN JSON FORMAT
    THE MINIMUM NUMBER OF CHAPTERS SHOULD BE 4 AND MAXIMUM SHOULD BE 10 and Each Chapters should have atlease 2 SUBMODULES
     inside eODULach SUBME there should be a content which is minimum of 150 words each
     DO NOT PROVIDE DUMMY DATA ALWAYS PROVIDE DATA WHICH IS COMPLETELY RELATED TO THE COURSE ASKED IN THE PROMPT
    `;

    try {
      const geminiApi = axios.create({
        headers: {
          "Content-Type": "application/json"
        }
      });

      const request1 = geminiApi.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: adminPrompt + " " + basicSchemaData
                }
              ]
            }
          ]
        }
      );

      const request2 = geminiApi.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `${adminPrompt} Outcomes: ${outcomes} Benefits: ${benefits} Requirements: ${requirements} ${chapterSchemaData}`
                }
              ]
            }
          ]
        }
      );

      const [response1, response2] = await Promise.all([request1, request2]);
      
      // Gemini API response structure is different from OpenAI
      const basicDataText = response1.data.candidates[0].content.parts[0].text;
      const chapterDataText = response2.data.candidates[0].content.parts[0].text;

      // Extract JSON from the response text (Gemini might return text with markdown formatting)
      const basicData = JSON.parse(basicDataText.replace(/```json\n?/g, '').replace(/```\n?/g, ''));
      const chapterData = JSON.parse(chapterDataText.replace(/```json\n?/g, '').replace(/```\n?/g, ''));

      console.log("basicData", basicData);
      console.log("chapterData", chapterData);

      //Update courseData with the generated content
      setCourseData({
        ...courseData,
        courseTitle: basicData.courseTitle,
        courseSubtitle: basicData.courseSubtitle,
        courseDescription: basicData.courseDescription,
        courseDuration: basicData.courseDuration,
        courseOutcome: basicData.courseOutcome,
        courseBenefits: basicData.courseBenefits,
        courseRequirements: basicData.courseRequirements,
        courseLanguages: basicData.courseLanguages,
        courseContent: chapterData.courseContent,
      });
      messageApi.destroy();
      nextStep();

    } catch (error) {
      console.error("Error generating content:", error);
      messageApi.destroy();
      messageApi.error("Error generating content");
    }
  };

  const addChapter = () => {
    const newChapter = {
      name: `Chapter ${courseData.courseContent?.length + 1 || 1}`,
      subTopics: [
        { 
          name: "Subtopic 1", 
          content: "Content for subtopic 1"
        },
        { 
          name: "Subtopic 2", 
          content: "Content for subtopic 2"
        }
      ],
      quiz: {
        name: "Quiz 1",
        questions: [
          {
            question: "Question 1",
            options: [
              { option: "Option 1", isCorrect: false },
              { option: "Option 2", isCorrect: false }
            ]
          }
        ]
      }
    };
    setCourseData({
      ...courseData,
      courseContent: [...(courseData.courseContent || []), { chapter: newChapter }]
    });
  };

  const deleteChapter = (index) => {
    const updatedChapters = courseData.courseContent.filter((_, i) => i !== index);
    setCourseData({
      ...courseData,
      courseContent: updatedChapters
    });
  };

  const removeSubtopic = (chapterIndex, subtopicIndex) => {
    setCourseData({
      ...courseData,
      courseContent: courseData.courseContent.map((chapter, index) => {
        if (index === chapterIndex) {
          return {
            ...chapter,
            chapter: {
              ...chapter.chapter,
              subTopics: chapter.chapter.subTopics.filter((_, subIndex) => subIndex !== subtopicIndex)
            }
          };
        }
        return chapter;
      })
    });
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleOutcomeChange = useCallback((data) => {
    setCourseData(prev => ({ ...prev, courseOutcome: data }));
  }, []);

  const handleBenefitsChange = useCallback((data) => {
    setCourseData(prev => ({ ...prev, courseBenefits: data }));
  }, []);

  const handleRequirementsChange = useCallback((data) => {
    setCourseData(prev => ({ ...prev, courseRequirements: data }));
  }, []);

  const handleLanguagesChange = useCallback((data) => {
    setCourseData(prev => ({ ...prev, courseLanguages: data }));
  }, []);

  const stepIcons = [SparklesIcon, DocumentTextIcon, BookOpenIcon, CheckCircleIcon];
  const stepTitles = ["AI Generation", "Course Details", "Create Chapters", "Complete"];

  const ProgressIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNumber = i + 1;
        const Icon = stepIcons[i];
        const isActive = step >= stepNumber;
        const isCurrent = step === stepNumber;
        
        return (
          <React.Fragment key={stepNumber}>
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500'
                } ${isCurrent ? 'ring-4 ring-indigo-200 scale-110' : ''}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className={`text-xs mt-2 font-medium ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
                {stepTitles[i]}
              </span>
            </div>
            {i < totalSteps - 1 && (
              <div className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
                step > stepNumber ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  const renderFormForStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col h-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                AI Course Generator
              </h2>
              <p className="text-gray-600 text-lg">
                Describe your course idea and let AI create a comprehensive curriculum for you
              </p>
            </div>

            <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
              <div className="relative flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                <div className="pt-16 pb-6 px-6 h-full flex flex-col">
                  <div className="flex-1">
                    <textarea
                      value={adminPrompt}
                      onChange={(e) => setAdminPrompt(e.target.value)}
                      placeholder="Describe the course you want to create... 

For example:
• Create a comprehensive React.js course for beginners
• Build a Python data science course with hands-on projects
• Design a UI/UX course covering design principles and tools"
                      className="w-full h-full resize-none border-none outline-none text-gray-800 placeholder-gray-400 text-lg leading-relaxed p-4"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        {adminPrompt.length} characters
                      </span>
                      {adminPrompt.length > 50 && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircleIcon className="w-4 h-4" />
                          <span className="text-sm">Good description</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setStep(2)}
                        className="text-gray-500 hover:text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Skip AI
                      </button>
                      <button
                        onClick={generateCourseData}
                        disabled={!adminPrompt.trim() || isGenerating}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          adminPrompt.trim() && !isGenerating
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {isGenerating ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <SparklesIcon className="w-5 h-5" />
                            <span>Generate Course</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="h-full flex flex-col">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Details</h2>
              <p className="text-gray-600">Configure your course information and structure</p>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="space-y-8">
                {/* Basic Information */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Title *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Course Title"
                        value={courseData.courseTitle}
                        onChange={(e) => setCourseData({ ...courseData, courseTitle: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Course Subtitle"
                        value={courseData.courseSubtitle}
                        onChange={(e) => setCourseData({ ...courseData, courseSubtitle: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      placeholder="Enter Course Description"
                      value={courseData.courseDescription}
                      onChange={(e) => setCourseData({ ...courseData, courseDescription: e.target.value })}
                      className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    />
                  </div>
                </div>

                {/* Course Structure */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Outcomes</h3>
                    <DynamicForm
                      data={courseData.courseOutcome || []}
                      onChange={handleOutcomeChange}
                    />
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Benefits</h3>
                    <DynamicForm
                      data={courseData.courseBenefits || []}
                      onChange={handleBenefitsChange}
                    />
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                    <DynamicForm
                      data={courseData.courseRequirements || []}
                      onChange={handleRequirementsChange}
                    />
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
                    <DynamicForm
                      data={courseData.courseLanguages || []}
                      onChange={handleLanguagesChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="h-full flex flex-col">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Chapters</h2>
              <p className="text-gray-600">Organize your course content into chapters and topics</p>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="space-y-6">
                {courseData.courseContent?.map((chap, index) => (
                  <ChapterCard
                    key={index}
                    index={index}
                    chapterData={chap.chapter}
                    onDelete={() => deleteChapter(index)}
                    onEditSubtopic={(chapterIndex, subtopicIndex, subtopicData) => {
                      setEditSubtopicData({ chapterIndex, subtopicIndex, subtopicData });
                      setIsModalOpen(true);
                    }}
                    onRemoveSubtopic={removeSubtopic}
                  />
                ))}
                
                <div className="flex justify-center">
                  <button
                    onClick={addChapter}
                    className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <BookOpenIcon className="w-5 h-5" />
                    <span>Add New Chapter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Course {id ? "Updated" : "Created"} Successfully!
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Your course has been {id ? "updated" : "created"} successfully.
                You can view your course in your dashboard.
              </p>
              <button
                onClick={() => navigate("/course")}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Go to Courses
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {contextHolder}
      
      <div className="max-w-7xl mx-auto p-6">
        <ProgressIndicator />
        
        <div className="min-h-0">
          <div className="flex flex-col">
            {renderFormForStep()}
          </div>
          
          {/* Navigation */}
          {step !== 4 && (
            <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  step === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Previous</span>
              </button>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{step} of {totalSteps}</span>
              </div>
              
              {step === 3 ? (
                <button
                  onClick={id ? updateCourse : createCourse}
                  className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span>{id ? 'Update Course' : 'Create Course'}</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span>Next</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <Modal
        title="Edit Subtopic"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        className="custom-modal"
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">
            Chapter {editSubtopicData.chapterIndex} - Subtopic {editSubtopicData.subtopicIndex}
          </h3>
        </div>
      </Modal>
    </div>
  );
};

const CreateCourse = () => {
  return (
    <div className="min-h-full">
      <MultiStepForm />
    </div>
  );
};

export default CreateCourse;
