import React from 'react';
import { Flame } from 'lucide-react';
import { generateTagSlug } from '../data/tagAdminStore';

interface TrendingTopicsBarProps {
  topics: string[];
  onSelectTopic: (topic: string) => void;
  activeTopic?: string;
}

export const TrendingTopicsBar: React.FC<TrendingTopicsBarProps> = ({
  topics,
  onSelectTopic,
  activeTopic,
}) => {
  return (
    <div id="trending-topics-bar" className="bg-white border-b border-slate-200 py-2">
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 overflow-hidden">
        {/* Label */}
        <div className="flex items-center gap-1 text-xs font-bold text-red-600 uppercase tracking-wide flex-shrink-0">
          <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600 animate-bounce" />
          <span>Topik Populer:</span>
        </div>

        {/* Tags List */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {topics.map((topic, idx) => {
            const isSelected = activeTopic === topic;
            const tagSlug = generateTagSlug(topic.replace(/^#/, ''));
            return (
              <a
                key={idx}
                id={`topic-tag-${idx}`}
                href={`/tag/${tagSlug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectTopic(topic);
                }}
                className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition border inline-block ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-600 shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 border-slate-200'
                }`}
              >
                {topic}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

