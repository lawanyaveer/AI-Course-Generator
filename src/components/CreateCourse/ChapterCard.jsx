import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { 
  SiPython, 
  SiJavascript, 
  SiHtml5, 
  SiCss3, 
  SiReact, 
  SiAngular,
  SiVuedotjs,
  SiNodedotjs,
  SiOpenjdk, // Changed from SiJava
  SiPhp
} from "react-icons/si";
import { Checkbox } from "antd";

const getTechLogo = (courseName) => {
  const name = courseName.toLowerCase();
  if (name.includes('python')) return <SiPython className="w-20 h-20 opacity-10 text-blue-500" />;
  if (name.includes('javascript')) return <SiJavascript className="w-20 h-20 opacity-10 text-yellow-400" />;
  if (name.includes('html')) return <SiHtml5 className="w-20 h-20 opacity-10 text-orange-500" />;
  if (name.includes('css')) return <SiCss3 className="w-20 h-20 opacity-10 text-blue-400" />;
  if (name.includes('react')) return <SiReact className="w-20 h-20 opacity-10 text-cyan-400" />;
  if (name.includes('angular')) return <SiAngular className="w-20 h-20 opacity-10 text-red-500" />;
  if (name.includes('vue')) return <SiVuedotjs className="w-20 h-20 opacity-10 text-green-500" />;
  if (name.includes('node')) return <SiNodedotjs className="w-20 h-20 opacity-10 text-green-600" />;
  if (name.includes('java')) return <SiOpenjdk className="w-20 h-20 opacity-10 text-red-600" />;
  if (name.includes('php')) return <SiPhp className="w-20 h-20 opacity-10 text-purple-600" />;
  return null;
};

const ChapterCard = ({ chapterData, index, onDelete, onEditSubtopic, onRemoveSubtopic }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div
        className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 cursor-pointer hover:from-indigo-100 hover:to-purple-100 transition-colors relative"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Background Logo */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-6">
          {getTechLogo(chapterData.name)}
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {expanded ? (
                <FiChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <FiChevronRight className="w-4 h-4 text-gray-600" />
              )}
              <h3 className="text-base font-medium text-gray-900">
                {index + 1}. {chapterData.name}
              </h3>
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle edit
                }}
                className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-white rounded-md transition-colors"
              >
                <FiEdit size={14} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-white rounded-md transition-colors"
              >
                <AiOutlineDelete size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="p-4 space-y-3">
          {chapterData.subTopics?.map((subtopic, subIndex) => (
            <div key={subIndex} className="bg-gray-50 rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm text-gray-900">{subtopic.name}</h4>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onEditSubtopic(index, subIndex, subtopic)}
                    className="p-1 text-gray-600 hover:text-indigo-600 rounded"
                  >
                    <FiEdit size={12} />
                  </button>
                  <button
                    onClick={() => onRemoveSubtopic(index, subIndex)}
                    className="p-1 text-gray-600 hover:text-red-600 rounded"
                  >
                    <AiOutlineDelete size={12} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">{subtopic.content}</p>
            </div>
          ))}

          {chapterData.quiz && (
            <div className="bg-blue-50 rounded-md p-3">
              <h4 className="font-medium text-sm text-gray-900 mb-2">{chapterData.quiz.name}</h4>
              <div className="space-y-3">
                {chapterData.quiz.questions?.map((quiz, subIndex) => (
                  <div key={subIndex} className="bg-white rounded-md p-3">
                    <h5 className="font-medium text-sm text-gray-900 mb-2">
                      {subIndex + 1}. {quiz.question}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {quiz.options?.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <Checkbox checked={option.isCorrect} disabled />
                          <span className="text-gray-700 text-xs">{option.option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChapterCard;
