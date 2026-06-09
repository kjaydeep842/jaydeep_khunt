import os

def main():
    file_path = "src/App.jsx"
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    with open(file_path, "r", encoding="utf-8") as f:
        code = f.read()

    replacements = [
        # Mouse cursor follower
        ('borderColor: isHoveringInteractive ? "rgba(225, 217, 193, 0.9)" : "rgba(225, 217, 193, 0.4)",', 
         'borderColor: isHoveringInteractive ? "rgba(16, 185, 129, 0.9)" : "rgba(16, 185, 129, 0.4)",'),
        ('backgroundColor: isHoveringInteractive ? "rgba(225, 217, 193, 0.12)" : "rgba(225, 217, 193, 0.02)"', 
         'backgroundColor: isHoveringInteractive ? "rgba(16, 185, 129, 0.12)" : "rgba(16, 185, 129, 0.02)"'),

        # Scroll Draw SVG lines
        ('stroke="#E1D9C1"', 'stroke="#10b981"'),

        # InteractiveCard hover glow color
        ('from-[#E1D9C1]/8', 'from-[#10b981]/8'),

        # Preloader Component
        ('className="fixed inset-0 bg-[#0E0E0E] z-[99999] flex flex-col justify-center items-center select-none"\n          style={{\n            backgroundImage: "url(\'/assets/images/bg.png\')",\n            backgroundSize: "cover",\n            backgroundPosition: "center"\n          }}',
         'className="fixed inset-0 bg-[#f8fafc] z-[99999] flex flex-col justify-center items-center select-none aurora-bg"'),
        ('src="/assets/images/gear1.png"\n                className="w-[100px] h-[100px] object-contain animate-rotate-cw opacity-80"',
         'src="/assets/images/gear1.png"\n                className="w-[100px] h-[100px] object-contain animate-rotate-cw opacity-80 emerald-steampunk-tint"'),
        ('src="/assets/images/gear2.png"\n                className="absolute w-[70px] h-[70px] object-contain animate-rotate-ccw opacity-65 origin-center"',
         'src="/assets/images/gear2.png"\n                className="absolute w-[70px] h-[70px] object-contain animate-rotate-ccw opacity-65 origin-center emerald-steampunk-tint"'),
        ('src="/assets/images/gear3.png"\n                className="absolute w-[55px] h-[55px] object-contain animate-rotate-ccw-fast opacity-55 origin-center"',
         'src="/assets/images/gear3.png"\n                className="absolute w-[55px] h-[55px] object-contain animate-rotate-ccw-fast opacity-55 origin-center emerald-steampunk-tint"'),
        ('stroke="rgba(225, 217, 193, 0.05)"', 'stroke="rgba(16, 185, 129, 0.08)"'),
        ('stroke="#E1D9C1"', 'stroke="#10b981"'),
        ('className="absolute px-5 py-2.5 bg-[#E1D9C1] hover:bg-[#CAC5BD] text-[#0E0E0E] rounded-full text-[10px] font-mono tracking-widest font-bold border border-[#E1D9C1] hover:scale-105 transition-all shadow-xl cursor-pointer"',
         'className="absolute px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-[10px] font-mono tracking-widest font-bold border border-emerald-500 hover:scale-105 transition-all shadow-xl cursor-pointer"'),
        ('text-[#E1D9C1]/50', 'text-emerald-700/60'),

        # HeroPortal
        ('className="absolute w-[95%] h-[95%] object-contain opacity-[0.22] z-0 pointer-events-none"',
         'className="absolute w-[95%] h-[95%] object-contain opacity-[0.22] z-0 pointer-events-none emerald-steampunk-tint"'),
        ('className="absolute w-[180px] h-[180px] opacity-[0.15] z-0 pointer-events-none"',
         'className="absolute w-[180px] h-[180px] opacity-[0.15] z-0 pointer-events-none emerald-steampunk-tint"'),
        ('className="absolute w-[90px] h-[90px] opacity-[0.12] z-0 pointer-events-none"',
         'className="absolute w-[90px] h-[90px] opacity-[0.12] z-0 pointer-events-none emerald-steampunk-tint"'),
        ('border border-[#E1D9C1]/25 z-10', 'border border-emerald-500/30 z-10'),
        ('className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none select-none mix-blend-screen opacity-90"',
         'className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none select-none mix-blend-screen opacity-90 emerald-steampunk-tint"'),
        ('className="absolute w-[105%] h-[105%] object-cover z-0 scale-[1.03]"',
         'className="absolute w-[105%] h-[105%] object-cover z-0 scale-[1.03] emerald-steampunk-tint"'),
        ('border border-[#E1D9C1]/10 rounded-full z-20 pointer-events-none m-3 animate-rotate-cw',
         'border border-emerald-500/20 rounded-full z-20 pointer-events-none m-3 animate-rotate-cw'),
        ('border border-[#E1D9C1]/5 rounded-full z-20 pointer-events-none m-6 animate-rotate-ccw',
         'border border-emerald-500/10 rounded-full z-20 pointer-events-none m-6 animate-rotate-ccw'),

        # Main Layout
        ('className="min-h-screen relative overflow-hidden font-sans select-none text-[#E1D9C1] pb-12"',
         'className="min-h-screen relative overflow-hidden font-sans select-none text-slate-700 pb-12 aurora-bg">\n      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern pointer-events-none z-0" />\n      <div className="absolute top-0 left-0 w-full h-full bg-dot-pattern pointer-events-none z-0"'),
        ('className="fixed top-0 left-0 right-0 h-0.5 bg-[#E1D9C1] z-[9999] origin-left"',
         'className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-amber-500 z-[9999] origin-left"'),
        ('bg-[#E1D9C1]/3', 'bg-emerald-500/5'),
        ('bg-[#0E0E0E]/95 shadow-lg border-[#E1D9C1]/15 backdrop-blur-md py-3',
         'bg-white/90 shadow-md border-slate-200/80 backdrop-blur-md py-3'),
        ('border border-[#E1D9C1]/30 bg-[#0E0E0E] flex items-center justify-center font-display text-lg text-[#E1D9C1] shadow-md cursor-pointer',
         'border border-slate-200 bg-white flex items-center justify-center font-display text-lg text-slate-800 shadow-md cursor-pointer'),
        ('text-base sm:text-lg font-normal font-display tracking-wider text-[#E1D9C1] m-0 leading-none uppercase',
         'text-base sm:text-lg font-bold font-display tracking-wider text-slate-900 m-0 leading-none uppercase'),
        ('text-[8px] font-mono text-[#E1D9C1]/60 uppercase tracking-widest block mt-0.5',
         'text-[8px] font-mono text-slate-500 uppercase tracking-widest block mt-0.5'),
        ('text-[#E1D9C1] font-bold', 'text-emerald-700 font-bold'),
        ('text-[#CAC5BD]/60 hover:text-[#E1D9C1]', 'text-slate-600 hover:text-emerald-600'),
        ('className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E1D9C1]"',
         'className="absolute bottom-0 left-0 right-0 h-[1px] bg-emerald-600"'),
        ('className="px-4 py-2 rounded-full border border-[#E1D9C1]/30 text-[#E1D9C1] transition-all text-[9px] font-bold tracking-widest"',
         'className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 hover:bg-emerald-500/20 transition-all text-[9px] font-bold tracking-widest"'),
        ('className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E1D9C1]/25 hover:bg-[#E1D9C1]/5 transition-all text-[9px] font-mono tracking-wider cursor-pointer"',
         'className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white/70 hover:bg-slate-50 transition-all text-[9px] font-mono text-slate-700 tracking-wider cursor-pointer shadow-sm"'),
        ('className="text-[#E1D9C1]/75"', 'className="text-slate-600"'),
        ('border border-[#E1D9C1]/20 text-[8px] font-mono tracking-wider cursor-pointer',
         'border border-slate-200 text-[8px] font-mono text-slate-700 tracking-wider cursor-pointer'),
        ('text-[#E1D9C1] hover:text-white transition-colors p-1', 'text-slate-600 hover:text-slate-900 transition-colors p-1'),
        ('bg-[#0E0E0E]/95 border-b border-[#E1D9C1]/15 z-40 p-6 md:hidden flex flex-col gap-4 font-mono text-xs shadow-2xl tracking-widest uppercase',
         'bg-white/95 border-b border-slate-200 z-40 p-6 md:hidden flex flex-col gap-4 font-mono text-xs shadow-lg tracking-widest uppercase'),
        ('text-[#CAC5BD] hover:text-[#E1D9C1] py-2 border-b border-[#E1D9C1]/5',
         'text-slate-700 hover:text-emerald-600 py-2 border-b border-slate-100'),
        ('className="py-2 text-[#E1D9C1] font-semibold"', 'className="py-2 text-emerald-600 font-semibold"'),

        # Hero about section
        ('bg-[#E1D9C1]/5 border border-[#E1D9C1]/15 text-[#E1D9C1] font-mono text-[9px] font-bold uppercase tracking-widest',
         'bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 font-mono text-[9px] font-bold uppercase tracking-widest'),
        ('className="text-[#E1D9C1] animate-spin"', 'className="text-emerald-600 animate-spin"'),
        ('text-[#CAC5BD] text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-light font-sans',
         'text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-light font-sans'),
        ('Counter value={stat.val === "14205" ? coffeeCounter : stat.val}',
         'Counter value={stat.val === "14205" ? coffeeCounter : stat.val}'),
        ('text-[8px] text-[#CAC5BD]/55 uppercase tracking-widest mt-1 font-semibold font-mono',
         'text-[8px] text-slate-500 uppercase tracking-widest mt-1 font-semibold font-mono'),
        ('className="px-6 py-3.5 rounded-full bg-[#E1D9C1] hover:bg-[#CAC5BD] text-[#0E0E0E] font-bold flex items-center gap-2 shadow-lg transition-all cursor-pointer"',
         'className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-2 shadow-lg transition-all cursor-pointer shadow-emerald-500/10"'),
        ('className="px-6 py-3.5 rounded-full bg-[#0E0E0E] border border-[#E1D9C1]/20 text-[#E1D9C1] font-semibold flex items-center gap-2 transition-all cursor-pointer"',
         'className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white border-transparent font-semibold flex items-center gap-2 transition-all cursor-pointer"'),

        # Diagnostic shell inside Hero
        ('className="w-full glass-panel-dark rounded-xl overflow-hidden mt-6"',
         'className="w-full glass-panel-dark rounded-xl overflow-hidden mt-6 border border-slate-800 shadow-xl"'),
        ('bg-[#0A0A0A] px-4 py-2.5 border-b border-[#E1D9C1]/10 flex justify-between items-center font-mono text-[9px] uppercase tracking-wider',
         'bg-[#0c1322] px-4 py-2.5 border-b border-slate-800 flex justify-between items-center font-mono text-[9px] uppercase tracking-wider'),
        ('text-[#CAC5BD]/60 flex items-center gap-1', 'text-slate-400 flex items-center gap-1'),
        ('TerminalIcon size={10} className="text-[#E1D9C1]"', 'TerminalIcon size={10} className="text-emerald-400"'),
        ('bg-[#080808]/90 text-[#CAC5BD]', 'bg-[#070b14]/90 text-slate-300'),
        ('className={item.type === \'input\' ? \'text-white font-semibold\' : \'text-[#E1D9C1]/80 leading-relaxed whitespace-pre-wrap font-light\'}',
         'className={item.type === \'input\' ? \'text-white font-semibold\' : \'text-slate-300 leading-relaxed whitespace-pre-wrap font-light\'}'),
        ('className="text-[#E1D9C1]/65 mr-2"', 'className="text-emerald-400 mr-2"'),
        ('border-t border-[#E1D9C1]/10 bg-[#0A0A0A] px-4 py-2 flex items-center',
         'border-t border-slate-800 bg-[#0c1322] px-4 py-2 flex items-center'),
        ('text-[#E1D9C1]/65 font-mono text-[10px] mr-2', 'text-emerald-400 font-mono text-[10px] mr-2'),
        ('placeholder-[#CAC5BD]/30', 'placeholder-slate-600'),
        ('text-[#E1D9C1] hover:text-white p-1 cursor-pointer', 'text-emerald-400 hover:text-emerald-300 p-1 cursor-pointer'),
        ('text-[#CAC5BD]/55 flex items-center gap-1', 'text-slate-500 flex items-center gap-1'),
        ('className="text-[#E1D9C1] animate-pulse"', 'className="text-emerald-500 animate-pulse"'),
        ('text-[#CAC5BD]/50', 'text-slate-500'),

        # Skills core sections
        ('text-[#E1D9C1] uppercase tracking-widest font-semibold', 'text-emerald-600 uppercase tracking-widest font-semibold'),
        ('bg-[#0A0A0A]/50 border border-[#E1D9C1]/15 p-6 rounded-xl space-y-6 h-full',
         'glass-panel p-6 rounded-xl space-y-6 h-full shadow-sm'),
        ('bg-[#E1D9C1]/5 flex items-center justify-center text-[#E1D9C1] border border-[#E1D9C1]/15',
         'bg-emerald-500/10 flex items-center justify-center text-emerald-700 border border-emerald-500/20'),
        ('text-white uppercase tracking-wider', 'text-slate-900 uppercase tracking-wider'),
        ('text-[#CAC5BD] font-light leading-relaxed font-sans', 'text-slate-600 font-light leading-relaxed font-sans'),
        ('text-[#CAC5BD]', 'text-slate-700'),
        ('text-[#E1D9C1] font-bold', 'text-emerald-600 font-bold'),
        ('bg-[#E1D9C1]/10 rounded-full overflow-hidden', 'bg-slate-100 border border-slate-200/40 rounded-full overflow-hidden'),
        ('className={`h-full ${s.color}`}', 'className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"'),

        # Works List & Selector
        ('bg-[#E1D9C1]/10 border-[#E1D9C1] text-white shadow-md',
         'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm font-bold'),
        ('bg-[#0E0E0E] border-[#E1D9C1]/15 hover:border-[#E1D9C1]/40 hover:bg-[#E1D9C1]/5',
         'bg-white/70 border-slate-200 hover:border-emerald-500/40 hover:bg-emerald-50/20'),
        ('h3 className="font-normal text-[#E1D9C1] text-sm sm:text-base font-mono uppercase tracking-wider"',
         'h3 className="font-semibold text-slate-800 text-sm sm:text-base font-mono uppercase tracking-wider"'),
        ('bg-[#E1D9C1]/15 text-[#E1D9C1] px-1.5 py-0.5 rounded border border-[#E1D9C1]/30 uppercase tracking-widest font-bold animate-pulse',
         'bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-350 uppercase tracking-widest font-bold animate-pulse'),
        ('text-[11px] text-[#CAC5BD]/60 line-clamp-1 mt-1 font-sans font-light',
         'text-[11px] text-slate-500 line-clamp-1 mt-1 font-sans font-light'),
        ('bg-[#0A0A0A] text-[#CAC5BD] px-1.5 py-0.5 rounded border border-[#E1D9C1]/10',
         'bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200/60'),

        # Inspector detail block
        ('glass-panel-dark rounded-2xl overflow-hidden border border-[#E1D9C1]/15 flex flex-col bg-[#0E0E0E]/90 shadow-md',
         'glass-panel rounded-2xl overflow-hidden border border-slate-200 flex flex-col bg-white shadow-md'),
        ('px-4 sm:px-6 py-4 border-b border-[#E1D9C1]/10 flex flex-wrap justify-between items-center gap-3 bg-[#0A0A0A]',
         'px-4 sm:px-6 py-4 border-b border-slate-200 flex flex-wrap justify-between items-center gap-3 bg-slate-50'),
        ('bg-[#E1D9C1] animate-pulse', 'bg-emerald-500 animate-pulse'),
        ('text-[#E1D9C1] text-xs sm:text-sm uppercase tracking-wider leading-none',
         'text-slate-900 text-xs sm:text-sm uppercase tracking-wider leading-none'),
        ('text-[#CAC5BD]/55 block mt-1 tracking-wide', 'text-slate-500 block mt-1 tracking-wide'),
        ('className="px-2.5 py-1.5 rounded-lg border border-[#E1D9C1]/20 bg-[#E1D9C1]/5 hover:bg-[#E1D9C1]/10 text-[9px] font-mono text-[#E1D9C1] flex items-center gap-1.5 transition-colors font-bold uppercase tracking-wider"',
         'className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-[10px] font-mono text-white flex items-center gap-1.5 transition-colors font-bold uppercase tracking-wider shadow-sm"'),
        ('className="px-2.5 py-1.5 rounded-lg border border-[#E1D9C1]/15 hover:bg-[#E1D9C1]/5 text-[9px] font-mono text-[#CAC5BD] flex items-center gap-1.5 transition-colors font-bold uppercase tracking-wider"',
         'className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-[10px] font-mono text-slate-700 flex items-center gap-1.5 transition-colors font-bold uppercase tracking-wider"'),
        ('bg-[#0A0A0A] p-4 rounded-xl border border-[#E1D9C1]/10',
         'bg-slate-50 p-4 rounded-xl border border-slate-200/60'),
        ('text-white mt-1 block font-sans font-light', 'text-slate-800 mt-1 block font-sans font-light'),
        ('text-white mt-1 block flex items-center gap-1.5 font-mono', 'text-slate-800 mt-1 block flex items-center gap-1.5 font-mono'),
        ('text-[#E1D9C1] mt-1 block flex items-center gap-1.5 font-mono', 'text-emerald-700 mt-1 block flex items-center gap-1.5 font-mono'),
        ('text-[#CAC5BD]/55 uppercase tracking-widest mb-2 font-bold', 'text-slate-400 uppercase tracking-widest mb-2 font-bold'),
        ('text-[#CAC5BD] leading-relaxed font-sans font-light', 'text-slate-600 leading-relaxed font-sans font-light'),
        ('bg-[#0A0A0A] text-[#E1D9C1] px-3 py-1 rounded-full border border-[#E1D9C1]/15 font-semibold',
         'bg-slate-100 text-emerald-800 px-3 py-1 rounded-full border border-slate-200/60 font-semibold'),
        ('bg-[#0A0A0A] p-4 rounded-xl border border-[#E1D9C1]/10',
         'bg-slate-50 p-4 rounded-xl border border-slate-200/60'),
        ('bg-[#0E0E0E] border border-[#E1D9C1]/10', 'bg-white border border-slate-200/60'),
        ('text-[#CAC5BD]/40 text-[7px]', 'text-slate-400 text-[7px]'),
        ('text-white font-semibold truncate mt-1', 'text-slate-800 font-semibold truncate mt-1'),
        ('text-[#E1D9C1] font-semibold truncate mt-1', 'text-emerald-700 font-semibold truncate mt-1'),
        ('text-[#E1D9C1] hover:text-white transition-colors flex items-center gap-1 cursor-pointer p-1 font-bold',
         'text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer p-1 font-bold'),
        ('text-[#E1D9C1] animate-bounce', 'text-emerald-600 animate-bounce'),
        ('bg-[#0A0A0A] border border-[#E1D9C1]/10 max-h-[160px] overflow-y-auto',
         'bg-slate-900 border border-slate-800 max-h-[160px] overflow-y-auto'),
        ('text-[#E1D9C1] leading-relaxed whitespace-pre overflow-x-auto',
         'text-emerald-400 leading-relaxed whitespace-pre overflow-x-auto'),

        # Experience Roadmap
        ('border-l border-[#E1D9C1]/20 max-w-4xl mx-auto pl-5 sm:pl-8 space-y-12',
         'border-l border-slate-200 max-w-4xl mx-auto pl-5 sm:pl-8 space-y-12'),
        ('bg-[#0E0E0E] border border-[#E1D9C1]/20 text-[#E1D9C1] group-hover:border-[#E1D9C1] group-hover:scale-110 transition-all duration-300 shadow-md',
         'bg-white border border-slate-200 text-emerald-600 group-hover:border-emerald-500 group-hover:scale-110 transition-all duration-300 shadow-sm'),
        ('bg-[#0A0A0A]/40 border border-[#E1D9C1]/15 p-5 sm:p-6 rounded-2xl group-hover:border-[#E1D9C1]/40 transition-all duration-300 shadow-md',
         'glass-panel p-5 sm:p-6 rounded-2xl border border-slate-200 group-hover:border-emerald-500/40 transition-all duration-300 shadow-sm'),
        ('text-[10px] font-mono text-[#E1D9C1] font-semibold uppercase',
         'text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded uppercase'),
        ('text-[10px] font-mono text-[#CAC5BD]/55 uppercase tracking-wider',
         'text-[10px] font-mono text-slate-500 uppercase tracking-wider'),
        ('text-white group-hover:text-[#E1D9C1] transition-colors uppercase tracking-wider',
         'text-slate-900 group-hover:text-emerald-600 transition-colors uppercase tracking-wider'),
        ('text-[#CAC5BD]/80 leading-relaxed font-sans font-light',
         'text-slate-600 leading-relaxed font-sans font-light'),

        # Testimonials
        ('bg-[#0A0A0A]/40 border border-[#E1D9C1]/15 p-6 rounded-2xl flex flex-col justify-between h-full space-y-4 shadow-md',
         'glass-panel p-6 rounded-2xl border border-slate-200 flex flex-col justify-between h-full space-y-4 shadow-sm'),
        ('fill-[#E1D9C1] text-[#E1D9C1]', 'fill-amber-500 text-amber-500'),
        ('text-[#CAC5BD] italic leading-relaxed flex-1 font-sans font-light',
         'text-slate-600 italic leading-relaxed flex-1 font-sans font-light'),
        ('border-t border-[#E1D9C1]/10 pt-3 flex items-center justify-between',
         'border-t border-slate-200/65 pt-3 flex items-center justify-between'),
        ('text-[#CAC5BD]/60 uppercase tracking-widest', 'text-slate-500 uppercase tracking-widest'),
        ('text-[#E1D9C1] opacity-75 animate-pulse', 'text-emerald-600 opacity-75 animate-pulse'),

        # FAQ headers & items
        ('border border-[#E1D9C1]/15 bg-[#0E0E0E]/80 rounded-xl overflow-hidden shadow-md transition-all duration-300',
         'border border-slate-200 bg-white rounded-xl overflow-hidden shadow-sm hover:bg-slate-50/50 transition-all duration-300'),
        ('hover:bg-[#E1D9C1]/5 transition-colors font-mono tracking-wider cursor-pointer',
         'hover:bg-slate-50/50 transition-colors font-mono tracking-wider cursor-pointer'),
        ('text-[#E1D9C1] text-xs sm:text-sm font-semibold uppercase',
         'text-slate-800 text-xs sm:text-sm font-semibold uppercase'),
        ('className="text-[#E1D9C1]/60"', 'className="text-slate-400"'),
        ('px-6 pb-5 pt-1 text-[#CAC5BD] text-xs sm:text-sm border-t border-[#E1D9C1]/10 leading-relaxed font-sans font-light',
         'px-6 pb-5 pt-1 text-slate-600 text-xs sm:text-sm border-t border-slate-100 leading-relaxed font-sans font-light'),

        # FloatingParticles
        ('className="absolute rounded-full bg-[#E1D9C1]"', 'className="absolute rounded-full bg-[#10b981]"'),

        # Contact section Direct connects
        ('bg-[#0A0A0A] border border-[#E1D9C1]/15 text-[#E1D9C1] flex flex-col justify-between h-[105px] transition-all relative overflow-hidden shadow-md cursor-pointer',
         'glass-panel border-slate-200 text-slate-700 flex flex-col justify-between h-[105px] transition-all relative overflow-hidden shadow-sm cursor-pointer'),
        ('bg-[#E1D9C1]/3 rounded-full blur-md', 'bg-emerald-500/5 rounded-full blur-md'),
        ('bg-[#E1D9C1]/5 flex items-center justify-center text-[#E1D9C1] border border-[#E1D9C1]/10',
         'bg-emerald-500/10 flex items-center justify-center text-emerald-700 border border-emerald-500/20'),
        ('text-[7px] font-mono uppercase tracking-widest text-[#E1D9C1] font-bold',
         'text-[7px] font-mono uppercase tracking-widest text-slate-500 font-bold'),

        # Contact form
        ('bg-[#0A0A0A]/60 border border-[#E1D9C1]/15 p-5 sm:p-6 rounded-2xl relative overflow-hidden shadow-md',
         'glass-panel border-slate-200 p-5 sm:p-6 rounded-2xl relative overflow-hidden shadow-sm'),
        ('className="animate-spin text-[#E1D9C1] mb-6"', 'className="animate-spin text-emerald-500 mb-6"'),
        ('bg-[#0E0E0E] p-4 rounded border border-[#E1D9C1]/15 font-mono text-[9px] text-[#E1D9C1] space-y-2 h-[150px] overflow-y-auto uppercase tracking-wider',
         'bg-slate-950 p-4 rounded border border-slate-800 font-mono text-[9px] text-slate-300 space-y-2 h-[150px] overflow-y-auto uppercase tracking-wider'),
        ('bg-[#E1D9C1]/5 border border-[#E1D9C1]/20 flex items-center justify-center text-[#E1D9C1] animate-bounce',
         'bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 animate-bounce'),
        ('text-[#CAC5BD] max-w-sm font-sans font-light', 'text-slate-600 max-w-sm font-sans font-light'),
        ('bg-[#0E0E0E] border border-[#E1D9C1]/10 rounded-lg p-3 max-w-md mt-2 leading-relaxed font-mono uppercase tracking-wide',
         'bg-slate-50 border border-slate-200 rounded-lg p-3 max-w-md mt-2 leading-relaxed font-mono uppercase tracking-wide'),
        ('text-[#E1D9C1]', 'text-emerald-600'),
        ('className="w-full px-4 pt-6 pb-2 rounded-lg bg-[#0E0E0E] border border-[#E1D9C1]/15 text-white focus:outline-none focus:border-[#E1D9C1] transition-all font-sans font-light text-sm"',
         'className="w-full px-4 pt-6 pb-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-850 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-sans font-light text-sm"'),
        ('className="w-full px-4 pt-6 pb-2 rounded-lg bg-[#0E0E0E] border border-[#E1D9C1]/15 text-white focus:outline-none focus:border-[#E1D9C1] transition-all font-sans font-light text-sm resize-none"',
         'className="w-full px-4 pt-6 pb-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-850 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-sans font-light text-sm resize-none"'),
        ('focusedField === "name" || contactState.name\n                          ? "top-1.5 text-[#E1D9C1] scale-90 font-bold"\n                          : "top-4 text-[#CAC5BD]/50"',
         'focusedField === "name" || contactState.name\n                          ? "top-1.5 text-emerald-700 scale-90 font-bold"\n                          : "top-4 text-slate-400"'),
        ('focusedField === "email" || contactState.email\n                          ? "top-1.5 text-[#E1D9C1] scale-90 font-bold"\n                          : "top-4 text-[#CAC5BD]/50"',
         'focusedField === "email" || contactState.email\n                          ? "top-1.5 text-emerald-700 scale-90 font-bold"\n                          : "top-4 text-slate-400"'),
        ('focusedField === "message" || contactState.message\n                          ? "top-1.5 text-[#E1D9C1] scale-90 font-bold"\n                          : "top-4 text-[#CAC5BD]/50"',
         'focusedField === "message" || contactState.message\n                          ? "top-1.5 text-emerald-700 scale-90 font-bold"\n                          : "top-4 text-slate-400"'),
        ('className="w-full py-3.5 rounded-full bg-[#E1D9C1] hover:bg-[#CAC5BD] text-[#0E0E0E] font-mono uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all hover:scale-[1.01]"',
         'className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all hover:scale-[1.01] shadow-emerald-500/10"'),

        # Footer
        ('border-t border-[#E1D9C1]/15 py-12 px-6 text-center font-mono text-[10px] uppercase tracking-wider mt-20 relative z-10 bg-[#0A0A0A]',
         'border-t border-slate-200 py-12 px-6 text-center font-mono text-[10px] uppercase tracking-wider mt-20 relative z-10 bg-white/80 backdrop-blur-sm'),
        ('text-[#CAC5BD]/60 font-light', 'text-slate-500 font-light'),
        ('text-[#CAC5BD]/50 hover:text-[#E1D9C1] transition-colors flex items-center gap-1.5',
         'text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-1.5'),
        ('hover:text-[#E1D9C1] transition-colors', 'hover:text-emerald-600 transition-colors'),

        # Dedicated Project Specs View
        ('className="min-h-screen bg-[#0E0E0E] relative overflow-hidden font-sans text-[#E1D9C1] pb-16"',
         'className="min-h-screen bg-[#f8fafc] relative overflow-hidden font-sans text-slate-700 pb-16 aurora-bg">\n        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern pointer-events-none z-0"'),
        ('className="absolute top-0 left-0 w-full h-full bg-[#0E0E0E] opacity-95 pointer-events-none z-0"',
         ''),
        ('className="flex items-center justify-between border-b border-[#E1D9C1]/15 pb-6"',
         'className="flex items-center justify-between border-b border-slate-200 pb-6"'),
        ('text-[#E1D9C1] hover:text-[#CAC5BD] transition-all', 'text-emerald-600 hover:text-emerald-700 transition-all'),
        ('border border-[#E1D9C1]/20 hover:bg-[#E1D9C1]/5 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all',
         'border border-slate-200 hover:bg-slate-100 text-xs font-mono font-semibold text-slate-700 flex items-center gap-1.5 transition-all'),
        ('bg-[#E1D9C1] hover:bg-[#CAC5BD] text-[#0E0E0E] text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md',
         'bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-md'),
        ('bg-[#E1D9C1]/10 border border-[#E1D9C1]/20 text-[#E1D9C1] px-3 py-1 rounded-full font-bold',
         'bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 px-3 py-1 rounded-full font-bold'),
        ('text-3xl sm:text-4xl md:text-5xl font-normal font-display text-[#E1D9C1] mt-4 tracking-tight leading-none uppercase',
         'text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-900 mt-4 tracking-tight leading-none uppercase'),
        ('text-xs font-mono text-[#CAC5BD] mt-2 tracking-wide', 'text-xs font-mono text-slate-500 mt-2 tracking-wide'),
        ('glass-panel-dark p-6 rounded-2xl space-y-4', 'glass-panel p-6 rounded-2xl border border-slate-200 bg-white space-y-4'),
        ('text-[#E1D9C1] uppercase tracking-widest border-b border-[#E1D9C1]/10 pb-2',
         'text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2'),
        ('text-[#CAC5BD] leading-relaxed font-sans font-light', 'text-slate-600 leading-relaxed font-sans font-light'),
        ('bg-[#E1D9C1]/5 text-[#E1D9C1] px-3 py-1 rounded-full border border-[#E1D9C1]/15 font-semibold',
         'bg-slate-100 text-emerald-800 px-3 py-1 rounded-full border border-slate-200/60 font-semibold'),
        ('border border-[#E1D9C1]/15 rounded-2xl overflow-hidden shadow-inner bg-[#0E0E0E] relative',
         'border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-950 relative'),
        ('bg-[#0A0A0A] p-4 rounded-xl border border-[#E1D9C1]/10 font-mono text-[10px]',
         'bg-slate-50 p-4 rounded-xl border border-slate-200/60 font-mono text-[10px]'),
        ('text-[#CAC5BD]/55 uppercase tracking-widest mb-3 font-semibold',
         'text-slate-400 uppercase tracking-widest mb-3 font-semibold'),
        ('border-b border-[#E1D9C1]/10 pb-1.5', 'border-b border-slate-200 pb-1.5'),
        ('text-[#CAC5BD]/70', 'text-slate-500'),
        ('text-[#E1D9C1] font-semibold', 'text-slate-800 font-semibold'),
        ('text-[9px] font-mono text-[#CAC5BD]/60 uppercase tracking-widest font-semibold',
         'text-[9px] font-mono text-slate-400 uppercase tracking-widest font-semibold'),
        ('text-[#E1D9C1] hover:text-white transition-colors flex items-center gap-1 cursor-pointer p-1 font-bold',
         'text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer p-1 font-bold'),
        ('bg-[#0A0A0A] border border-[#E1D9C1]/10 max-h-[200px] overflow-y-auto',
         'bg-slate-900 border border-slate-800 max-h-[200px] overflow-y-auto'),
        ('text-[#E1D9C1] leading-relaxed overflow-x-auto whitespace-pre',
         'text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre'),

        # Admin CRM Authenticator
        ('bg-[#0E0E0E] relative overflow-hidden font-sans text-[#CAC5BD] pb-16',
         'bg-[#070b14] relative overflow-hidden font-sans text-slate-300 pb-16'),
        ('bg-[#0E0E0E] opacity-95 pointer-events-none z-0',
         'bg-grid-pattern opacity-10 pointer-events-none z-0'),
        ('glass-panel-dark p-6 sm:p-8 rounded-2xl space-y-6 shadow-2xl text-center',
         'glass-panel-dark p-6 sm:p-8 rounded-2xl border border-emerald-500/20 bg-[#0c1224] space-y-6 shadow-2xl text-center'),
        ('bg-[#E1D9C1]/5 border border-[#E1D9C1]/20 flex items-center justify-center text-[#E1D9C1] mx-auto',
         'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto'),
        ('text-[#CAC5BD]/60 mt-1 font-mono uppercase tracking-wider',
         'text-slate-500 mt-1 font-mono uppercase tracking-wider'),
        ('bg-[#0A0A0A] border border-[#E1D9C1]/15 text-white focus:outline-none focus:border-[#E1D9C1]',
         'bg-[#070b14] border border-slate-800 text-white focus:outline-none focus:border-emerald-500'),
        ('bg-[#E1D9C1] hover:bg-[#CAC5BD] text-[#0E0E0E] font-mono uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all',
         'bg-emerald-600 hover:bg-emerald-500 text-white font-mono uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all'),
        ('text-[#CAC5BD]/50 hover:text-white mt-2 uppercase tracking-wider',
         'text-slate-500 hover:text-slate-300 mt-2 uppercase tracking-wider'),

        # Admin CRM Dashboard
        ('h-10 w-10 rounded-lg bg-[#E1D9C1]/5 border border-[#E1D9C1]/20 flex items-center justify-center text-[#E1D9C1]',
         'h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/35 flex items-center justify-center text-emerald-400'),
        ('text-[#CAC5BD]/60 font-mono uppercase tracking-wider', 'text-slate-500 font-mono uppercase tracking-wider'),
        ('border-b border-[#E1D9C1]/15 pb-6', 'border-b border-slate-800 pb-6'),
        ('bg-[#0A0A0A] hover:bg-[#E1D9C1]/5 border border-[#E1D9C1]/15 text-[#E1D9C1] font-semibold flex items-center gap-1.5 transition-colors uppercase tracking-wider',
         'bg-[#070b14] hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold flex items-center gap-1.5 transition-colors uppercase tracking-wider'),
        ('adminTab === tab.id\n                          ? "bg-[#E1D9C1] border-[#E1D9C1] text-[#0E0E0E] font-bold shadow-md"\n                          : "bg-[#0A0A0A] border-[#E1D9C1]/15 text-[#CAC5BD] hover:bg-[#E1D9C1]/5"',
         'adminTab === tab.id\n                          ? "bg-emerald-600 border-emerald-600 text-white font-bold shadow-md"\n                          : "bg-[#070b14] border border-slate-800 text-slate-400 hover:bg-slate-800"'),
        ('adminTab === tab.id ? \'bg-[#0E0E0E] border-transparent text-[#E1D9C1]\' : \'bg-[#E1D9C1]/10 border-[#E1D9C1]/20 text-[#E1D9C1]\'',
         'adminTab === tab.id ? \'bg-emerald-850 border-transparent text-emerald-200\' : \'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400\''),
        ('bg-[#0A0A0A] border border-[#E1D9C1]/15 text-white focus:border-[#E1D9C1] outline-none',
         'bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none'),
        ('p-2.5 rounded bg-[#0A0A0A] border border-[#E1D9C1]/15 text-white focus:border-[#E1D9C1] outline-none',
         'p-2.5 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none'),
        ('bg-[#E1D9C1] hover:bg-[#CAC5BD] text-[#0E0E0E] font-bold cursor-pointer text-center flex items-center justify-center gap-2',
         'bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer text-center flex items-center justify-center gap-2'),
        ('border-t border-[#E1D9C1]/15 pt-6', 'border-t border-slate-800 pt-6'),
        ('text-[#CAC5BD] mb-3 uppercase tracking-wider', 'text-slate-400 mb-3 uppercase tracking-wider'),
        ('bg-[#0A0A0A] p-3 rounded border border-[#E1D9C1]/10 text-xs font-mono',
         'bg-[#070b14] p-3 rounded border border-slate-800 text-xs font-mono'),
        ('text-[#E1D9C1]', 'text-white'),
        ('text-[#CAC5BD]/55 block uppercase', 'text-slate-500 block uppercase'),

        # Project Mockups inside Mockup switcher
        ('className="h-full w-full bg-[#0E0E0E] rounded-lg p-3 flex flex-col font-mono text-[9px] text-[#CAC5BD] border border-[#E1D9C1]/10"',
         'className="h-full w-full bg-slate-900 rounded-lg p-3 flex flex-col font-mono text-[9px] text-slate-300 border border-slate-800"'),
        ('className="flex items-center justify-between border-b border-[#E1D9C1]/15 pb-2 mb-2"',
         'className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2"'),
        ('text-[#E1D9C1] font-bold', 'text-emerald-400 font-bold'),
        ('bg-[#E1D9C1]/20 text-[#E1D9C1] px-1.5 py-0.5 rounded text-[8px] uppercase',
         'bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded text-[8px] uppercase'),
        ('bg-[#0A0A0A] p-1.5 rounded border border-[#E1D9C1]/10',
         'bg-slate-950 p-1.5 rounded border border-slate-850'),
        ('text-[#CAC5BD]/55 text-[7px]', 'text-slate-500 text-[7px]'),
        ('bg-emerald-400', 'text-emerald-400'),
        ('className="flex-1 bg-[#0A0A0A] rounded p-2 border border-[#E1D9C1]/10 flex flex-col gap-1 overflow-y-auto"',
         'className="flex-1 bg-slate-950 rounded p-2 border border-slate-850 flex flex-col gap-1 overflow-y-auto"'),
        ('text-[#CAC5BD]/55 text-[8px]', 'text-slate-500 text-[8px]'),
        ('text-[#E1D9C1]/90 leading-tight select-none', 'text-slate-300 leading-tight select-none'),
        ('bg-[#0A0A0A] p-1.5 rounded border border-[#E1D9C1]/10',
         'bg-slate-950 p-1.5 rounded border border-slate-850'),
        ('className="flex justify-between bg-[#0A0A0A] p-1.5 rounded border border-[#E1D9C1]/10"',
         'className="flex justify-between bg-slate-950 p-1.5 rounded border border-slate-850"'),
        ('text-[#CAC5BD]/55', 'text-slate-500'),
        ('text-[#E1D9C1]', 'text-emerald-400'),
        ('className="mt-2 flex-1 bg-[#0A0A0A] rounded border border-[#E1D9C1]/10 p-2 flex items-center justify-center gap-4"',
         'className="mt-2 flex-1 bg-slate-950 rounded border border-slate-850 p-2 flex items-center justify-center gap-4"'),
        ('border-2 border-dashed border-[#E1D9C1] flex items-center justify-center animate-spin',
         'border-2 border-dashed border-emerald-500/40 flex items-center justify-center animate-spin'),
        ('text-[#E1D9C1]', 'text-emerald-500'),
        ('bg-[#0A0A0A] px-2 py-1 rounded border border-[#E1D9C1]/10 text-white',
         'bg-slate-950 px-2 py-1 rounded border border-slate-850 text-white'),
        ('bg-gradient-to-r from-[#E1D9C1] to-transparent animate-pulse',
         'bg-gradient-to-r from-emerald-500 to-transparent animate-pulse'),
        ('text-[#E1D9C1] font-bold', 'text-emerald-400 font-bold'),
        ('className="h-full w-full bg-[#0E0E0E] rounded-lg p-3 flex flex-col justify-center items-center text-center font-mono text-[9px] text-[#CAC5BD]/50 border border-[#E1D9C1]/10"',
         'className="h-full w-full bg-slate-900 rounded-lg p-3 flex flex-col justify-center items-center text-center font-mono text-[9px] text-slate-500 border border-slate-800"'),
        ('Cpu size={24} className="text-[#E1D9C1]/30 mb-2 animate-bounce"',
         'Cpu size={24} className="text-emerald-500/30 mb-2 animate-bounce"'),

        # Horizontal Marquee
        ('className="w-full overflow-hidden bg-[#0A0A0A] py-5 border-y border-[#E1D9C1]/15 relative"',
         'className="w-full overflow-hidden bg-slate-900 py-5 border-y border-slate-800 relative"'),
        ('className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0E0E0E] to-transparent z-10 pointer-events-none"',
         'className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none"'),
        ('className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0E0E0E] to-transparent z-10 pointer-events-none"',
         'className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none"'),
        ('className="flex gap-12 whitespace-nowrap text-[10px] font-mono text-[#E1D9C1] uppercase tracking-widest font-semibold"',
         'className="flex gap-12 whitespace-nowrap text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold"'),
        ('className="text-[#E1D9C1] animate-pulse"', 'className="text-emerald-500 animate-pulse"')
    ]

    count = 0
    for old, new in replacements:
        if old in code:
            code = code.replace(old, new)
            count += 1
        else:
            # Try single-line variants if formatting differs slightly
            pass

    # Special replacement for ScrollRevealText in Hero section to have the split gradient
    old_reveal = '''            {/* Word by word staggered fade blur header reveal */}
            <ScrollRevealText 
              text="Designing Resilient Systems With Performance Architecture" 
              className="text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.0] text-glow-gold text-[#E1D9C1] font-display"
              tag="h2"
            />'''
    new_reveal = '''            {/* Word by word staggered fade blur header reveal */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] text-slate-900 tracking-tight flex flex-wrap gap-x-2 gap-y-1 sm:gap-x-3 text-glow-emerald">
              {"Designing Resilient Systems".split(" ").map((word, idx) => (
                <motion.span 
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                  className="inline-block text-slate-900"
                >
                  {word}
                </motion.span>
              ))}
              <span className="w-full h-0"></span>
              {"With Performance Architecture".split(" ").map((word, idx) => (
                <motion.span 
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: (idx + 3) * 0.08, ease: "easeOut" }}
                  className="inline-block bg-gradient-to-r from-emerald-600 via-cyan-600 to-amber-600 bg-clip-text text-transparent"
                >
                  {word}
                </motion.span>
              ))}
            </h2>'''
    if old_reveal in code:
        code = code.replace(old_reveal, new_reveal)
        count += 1

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(code)

    print(f"Theme revert script completed. Made {count} replacements.")

if __name__ == "__main__":
    main()
