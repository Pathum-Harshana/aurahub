"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Meh, CloudRain, Sun } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const moodOptions = [
  { level: 1, emoji: <CloudRain />, label: "Stressed", color: "text-red-500", bg: "bg-red-50" },
  { level: 3, emoji: <Meh />, label: "Neutral", color: "text-yellow-500", bg: "bg-yellow-50" },
  { level: 5, emoji: <Sun />, label: "Radiant", color: "text-blue-500", bg: "bg-blue-50" },
];

export default function MoodTracker({ onUpdate }: { onUpdate: () => void }) {

    
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMoodSelect = async (score: number) => {
    const { error } = await supabase
      .from('mood_logs')
      .insert([{ mood_score: score }]);

    if (!error) {
      alert("Aura Logged!");
      onUpdate(); // This triggers the fetchMoodData in the parent (Home)
    }
  };

  return (
    <div className="p-8 bg-white rounded-3xl shadow-lg border border-slate-100 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">How's your Aura?</h2>
      <p className="text-slate-500 text-center mb-8">Tap an icon to log your daily wellbeing.</p>
      
      <div className="flex justify-around items-center">
        {moodOptions.map((mood) => (
          <motion.button
            key={mood.level}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            disabled={isSubmitting}
            onClick={() => handleMoodSelect(mood.level)}
            className={`flex flex-col items-center p-4 rounded-2xl transition-colors ${mood.bg} ${mood.color} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="w-12 h-12 mb-2">
              {mood.emoji}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">{mood.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );

  
}

