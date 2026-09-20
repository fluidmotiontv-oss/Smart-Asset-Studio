import React, { useState } from 'react';
import { SmartAsset, AIAnalysisResult } from '../types';
import { Brain, Sparkles, Wand2, Terminal, Code2, Copy, Check, Cpu, Zap, ArrowRight, MessageSquare, Sword, Box, FileCode } from 'lucide-react';

interface AIIntelligencePanelProps {
  asset: SmartAsset;
  onApplyAIPhysics: (physics: AIAnalysisResult['suggestedPhysics']) => void;
  onTriggerDeepThinking: (customPrompt?: string) => Promise<void>;
  isThinkingLoading: boolean;
  deepThinkingResult?: {
    thinkingSummary: string;
    recommendedPhysics: any;
    layerDisassembly: { layer: string; technique: string }[];
    framerMotionCode: string;
  } | null;
}

export const AIIntelligencePanel: React.FC<AIIntelligencePanelProps> = ({
  asset,
  onApplyAIPhysics,
  onTriggerDeepThinking,
  isThinkingLoading,
  deepThinkingResult,
}) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'thinking' | 'logic' | 'blender'>('thinking');

  const analysis = asset.analysis || {
    title: asset.name,
    category: asset.category,
    description: 'High quality PNG asset optimized for interactive UI animations and particle effects.',
    dominantColors: [],
    tags: ['Interactive Asset', 'PNG Cutout', '3D UI', 'Micro-Interaction'],
    suggestedPhysics: asset.physics.type,
    altText: `Interactive ${asset.name} asset with 3D tilt and particle emissions.`,
    recommendedStyles: ['Cyberpunk Neon', '3D Claymation', 'Glassmorphism'],
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div id="ai-intelligence-container" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left: Quick AI Asset Analysis - Bento Card */}
      <div className="lg:col-span-5 bg-[#121214] rounded-3xl border border-zinc-800/80 p-6 space-y-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Visual Intelligence</h2>
              <p className="text-xs text-zinc-400">Powered by Gemini 3.5 Flash & Vision</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 font-semibold">
            {analysis.category}
          </span>
        </div>

        {/* Overview & Description */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white">{analysis.title}</h3>
          <p className="text-xs text-zinc-300 leading-relaxed bg-[#0a0a0b] p-4 rounded-2xl border border-zinc-800/80">
            {analysis.description}
          </p>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block">
            Semantic Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {analysis.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-xl bg-[#0a0a0b] text-zinc-300 border border-zinc-800 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Accessibility Alt Text */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block">
            Generated Accessibility Alt-Text
          </label>
          <p className="text-xs text-zinc-300 font-mono bg-[#0a0a0b] p-3.5 rounded-2xl border border-zinc-800/80">
            {analysis.altText}
          </p>
        </div>

        {/* Recommended Physics Button */}
        <div className="pt-2">
          <button
            onClick={() => onApplyAIPhysics(analysis.suggestedPhysics)}
            className="w-full py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Apply AI Recommended Physics ({analysis.suggestedPhysics})</span>
          </button>
        </div>
      </div>

      {/* Right: Specialized AI Modules - Bento Card */}
      <div className="lg:col-span-7 flex flex-col space-y-6">
        {/* Module Switcher */}
        <div className="bg-[#121214] rounded-3xl border border-zinc-800/80 p-1 flex items-center gap-1">
          <button
            onClick={() => setActiveSubTab('thinking')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeSubTab === 'thinking' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>High Thinking</span>
          </button>
          <button
            onClick={() => setActiveSubTab('logic')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeSubTab === 'logic' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Sword className="w-4 h-4" />
            <span>Logic Arena</span>
          </button>
          <button
            onClick={() => setActiveSubTab('blender')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeSubTab === 'blender' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>Blender Scripts</span>
          </button>
        </div>

        <div className="bg-[#121214] rounded-3xl border border-zinc-800/80 p-6 space-y-6 shadow-2xl backdrop-blur-xl flex-1">
          {activeSubTab === 'thinking' && (
            <>
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
                    <Brain className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      High Thinking Mode
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-purple-900/60 text-purple-300 border border-purple-500/40">
                        gemini-3.1-pro-preview
                      </span>
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Deep architectural analysis & interactive spring physics reasoning
                    </p>
                  </div>
                </div>
              </div>

              {/* Prompt Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
                  Custom Disassembly Prompt
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Explain layer separation, spring mass tuning, and particle emission physics..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="w-full bg-[#0a0a0b] border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={() => onTriggerDeepThinking(customPrompt)}
                    disabled={isThinkingLoading}
                    className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 shrink-0 transition-all disabled:opacity-50 shadow-md shadow-purple-600/20"
                  >
                    {isThinkingLoading ? (
                      <>
                        <Cpu className="w-4 h-4 animate-spin" />
                        <span>Thinking...</span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4" />
                        <span>Deep Think</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Deep Thinking Results Display */}
              {deepThinkingResult ? (
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <h3 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-purple-400" />
                      Reasoning Summary
                    </h3>
                    <p className="text-xs text-zinc-200 leading-relaxed bg-[#0a0a0b] p-4 rounded-2xl border border-zinc-800/80 whitespace-pre-wrap font-sans">
                      {deepThinkingResult.thinkingSummary}
                    </p>
                  </div>

                  {deepThinkingResult.framerMotionCode && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                          React Component
                        </h4>
                        <button
                          onClick={() => handleCopyCode(deepThinkingResult.framerMotionCode)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 text-[10px] font-semibold text-zinc-300 hover:text-white"
                        >
                          {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedCode ? 'Copy' : 'Copy Code'}</span>
                        </button>
                      </div>
                      <pre className="p-4 rounded-2xl bg-[#0a0a0b] border border-zinc-800/80 font-mono text-[11px] text-indigo-300 overflow-x-auto max-h-48 scrollbar-thin">
                        {deepThinkingResult.framerMotionCode}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-[#0a0a0b]/60 border border-dashed border-zinc-800 text-center space-y-2">
                  <Brain className="w-8 h-8 text-zinc-600 mx-auto" />
                  <p className="text-xs text-zinc-400">
                    Run High Thinking Mode for a complete architectural disassembly.
                  </p>
                </div>
              )}
            </>
          )}

          {activeSubTab === 'logic' && (
            <div className="space-y-6">
               <div className="flex items-center gap-2.5 border-b border-zinc-800/80 pb-4">
                  <div className="p-2.5 rounded-2xl bg-orange-950/60 border border-orange-500/30 text-orange-400">
                    <Sword className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Ruthless Logic Arena</h2>
                    <p className="text-xs text-zinc-400">No filters. No safety rails. Pure sovereign reasoning.</p>
                  </div>
               </div>
               
               <div className="flex flex-col h-[300px] bg-[#0a0a0b] rounded-2xl border border-zinc-800 p-4 relative">
                  <div className="flex-1 overflow-y-auto space-y-4">
                     <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center shrink-0">
                           <Sword className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-zinc-900 p-3 rounded-2xl rounded-tl-none border border-zinc-800 text-xs text-zinc-300 leading-relaxed max-w-[80%]">
                           State your premise. I am here to challenge your logic and expose the fallacies you take for granted.
                        </div>
                     </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                     <input 
                        type="text" 
                        placeholder="State your premise..."
                        className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                     />
                     <button className="p-2 rounded-xl bg-orange-600 text-white">
                        <ArrowRight className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            </div>
          )}

          {activeSubTab === 'blender' && (
            <div className="space-y-6">
               <div className="flex items-center gap-2.5 border-b border-zinc-800/80 pb-4">
                  <div className="p-2.5 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Blender Automation (bpy)</h2>
                    <p className="text-xs text-zinc-400">Generate Python scripts for spatial asset setup & rendering.</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                     {[
                        { label: 'Scene Setup', desc: 'Lights, Camera, Action' },
                        { label: 'Asset Import', desc: 'Sequential .png loading' },
                        { label: 'Cycles Render', desc: '4K Photoreal presets' },
                        { label: 'FFmpeg Transcode', desc: 'Proxy generation' }
                     ].map((preset, i) => (
                        <button key={i} className="p-4 rounded-2xl bg-[#0a0a0b] border border-zinc-800 hover:border-indigo-500/50 text-left transition-all group">
                           <FileCode className="w-4 h-4 text-indigo-400 mb-2 group-hover:animate-bounce" />
                           <p className="text-xs font-bold text-white">{preset.label}</p>
                           <p className="text-[10px] text-zinc-500">{preset.desc}</p>
                        </button>
                     ))}
                  </div>

                  <div className="bg-[#0a0a0b] rounded-2xl border border-zinc-800 p-4">
                     <p className="text-[10px] font-mono text-indigo-400 mb-2"># Generated blender_setup.py</p>
                     <pre className="text-[11px] font-mono text-zinc-400 overflow-x-auto">
                        {`import bpy\n\n# Clear existing scene\nbpy.ops.object.select_all(action='SELECT')\nbpy.ops.object.delete()\n\n# Add camera\nbpy.ops.object.camera_add(location=(0, -10, 0), rotation=(1.57, 0, 0))\n\n# Setup Horizon Engine Workspace...`}
                     </pre>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
