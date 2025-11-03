/* Default values shown on load */


function updateCode(name, user, birthday){
const [y,m,d] = birthday.split('-').map(Number);
els.code.innerHTML = `\n<span class="kw">from</span> <span class="mod">datetime</span> <span class="kw">import</span> <span class="mod">date</span>\n<span class="mod">today</span> <span class="kw">=</span> <span class="mod">date</span>.<span class="func">today</span>()\n\n<span class="mod">name</span> <span class="kw">=</span> <span class="str">"${escapeHtml(name)}"</span>\n<span class="mod">username</span> <span class="kw">=</span> <span class="str">"${escapeHtml(user)}"</span>\n\n<span class="mod">birthday</span> <span class="kw">=</span> <span class="mod">date</span>(<span class="num">${y||2000}</span>, <span class="num">${m||1}</span>, <span class="num">${d||1}</span>)\n\n<span class="kw">if</span> (<span class="str">'today == birthday, love!<3'</span>):\n <span class="func">print</span>(<span class="str">'happy birthday.<3'</span>)\n <span class="func">DRINK_BEER</span>()\n<span class="kw">else</span>:\n <span class="func">GO_WORK</span>()\n `;
}


function escapeHtml(s){
return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}


function applyInputs(){
const name = els.name.value || defaults.name;
const user = els.username.value || defaults.username;
const bday = els.birthday.value || defaults.birthday;
els.outName.innerHTML = escapeHtml(name).replace(/\s/g,'&nbsp;');
els.outUser.textContent = user;
updateCode(name, user, bday);
}


function loadDefaults(){
els.name.value = defaults.name;
els.username.value = defaults.username;
els.birthday.value = defaults.birthday;
setCSSVars(defaults.colors);
// set pickers
els.clrBg.value = defaults.colors.bg; els.clrInk.value = defaults.colors.ink;
els.clrKw.value = defaults.colors.kw; els.clrMod.value = defaults.colors.mod;
els.clrFunc.value = defaults.colors.func; els.clrStr.value = defaults.colors.str;
els.clrNum.value = defaults.colors.num; els.clrBorder.value = defaults.colors.border;
applyInputs();
}


function bind(){
['input','change'].forEach(ev => {
els.name.addEventListener(ev, applyInputs);
els.username.addEventListener(ev, applyInputs);
els.birthday.addEventListener(ev, applyInputs);


const colorHandler = ()=> setCSSVars({
bg: els.clrBg.value, ink: els.clrInk.value, kw: els.clrKw.value, mod: els.clrMod.value,
func: els.clrFunc.value, str: els.clrStr.value, num: els.clrNum.value, border: els.clrBorder.value,
});
[els.clrBg, els.clrInk, els.clrKw, els.clrMod, els.clrFunc, els.clrStr, els.clrNum, els.clrBorder]
.forEach(el => el.addEventListener(ev, colorHandler));
});


els.presetWarm.onclick = () => setCSSVars({ bg:'#ffffff', ink:'#222222', kw:'#ff5722', mod:'#8e24aa', func:'#2e7d32', str:'#1565c0', num:'#d32f2f', border:'#e0e0e0' });
els.presetCool.onclick = () => setCSSVars({ bg:'#ffffff', ink:'#1a1a1a', kw:'#00acc1', mod:'#3949ab', func:'#00897b', str:'#1976d2', num:'#e53935', border:'#e0e0e0' });
els.presetDark.onclick = () => setCSSVars({ bg:'#121212', ink:'#f5f5f5', kw:'#ff8a65', mod:'#ba68c8', func:'#81c784', str:'#64b5f6', num:'#ef5350', border:'#333333' });


els.btnPNG.onclick = savePNG;
els.btnPDF.onclick = savePDF;
els.btnPrint.onclick = () => window.print();
}


async function savePNG(){
const node = els.sheet;
// Use higher pixel ratio for crisper output
const dataUrl = await htmlToImage.toPng(node, { pixelRatio: 2, cacheBust: true });
download(dataUrl, `cake-poster-${Date.now()}.png`);
}


async function savePDF(){
const node = els.sheet;
const dataUrl = await htmlToImage.toPng(node, { pixelRatio: 2, cacheBust: true });
const { jsPDF } = window.jspdf;
const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
// Fill the full page (keeping margins already baked into the design)
const pageW = pdf.internal.pageSize.getWidth();
const pageH = pdf.internal.pageSize.getHeight();
pdf.addImage(dataUrl, 'PNG', 0, 0, pageW, pageH, undefined, 'FAST');
pdf.save(`cake-poster-${Date.now()}.pdf`);
}


function download(dataUrl, filename){
const a = document.createElement('a');
a.href = dataUrl; a.download = filename; a.click();
}


window.addEventListener('DOMContentLoaded', () => { loadDefaults(); bind(); });