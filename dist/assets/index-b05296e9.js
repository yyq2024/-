(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))h(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&h(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function h(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();class m{constructor(i,o){this.x=i,this.y=o,this.radius=20,this.color="#00ff00",this.velocity={x:0,y:0}}draw(i){i.save(),i.translate(this.x,this.y),i.beginPath(),i.moveTo(0,-this.radius),i.lineTo(-this.radius,this.radius*.5),i.lineTo(-this.radius*.5,this.radius*.3),i.lineTo(-this.radius*.5,this.radius),i.lineTo(this.radius*.5,this.radius),i.lineTo(this.radius*.5,this.radius*.3),i.lineTo(this.radius,this.radius*.5),i.closePath(),i.fillStyle=this.color,i.fill(),i.beginPath(),i.moveTo(0,-this.radius*.3),i.lineTo(-this.radius*.3,this.radius*.3),i.lineTo(this.radius*.3,this.radius*.3),i.closePath(),i.fillStyle="#00ccff",i.fill(),i.beginPath(),i.moveTo(-this.radius*.4,this.radius),i.lineTo(-this.radius*.2,this.radius+this.radius*.5),i.lineTo(0,this.radius),i.lineTo(this.radius*.2,this.radius+this.radius*.5),i.lineTo(this.radius*.4,this.radius),i.fillStyle="#ff6600",i.fill(),i.restore()}update(){this.x+=this.velocity.x,this.x<this.radius&&(this.x=this.radius),this.x>800-this.radius&&(this.x=800-this.radius)}}class w{constructor(i,o){this.x=i,this.y=o,this.radius=15,this.color="#ff0000",this.velocity={x:0,y:2}}draw(i){i.beginPath(),i.arc(this.x,this.y,this.radius,0,Math.PI*2),i.fillStyle=this.color,i.fill()}update(){this.y+=this.velocity.y}}class T{constructor(i,o){this.x=i,this.y=o,this.radius=5,this.color="#fff",this.velocity={x:0,y:-7}}draw(i){i.beginPath(),i.arc(this.x,this.y,this.radius,0,Math.PI*2),i.fillStyle=this.color,i.fill()}update(){this.y+=this.velocity.y}}const a=document.getElementById("gameCanvas"),d=a.getContext("2d"),v=document.getElementById("scoreEl");a.width=800;a.height=600;let n=0,e,u=[],l=[],p,f;function g(){e=new m(a.width/2,a.height-100),n=0,u=[],l=[],v.innerHTML=n,f&&clearInterval(f),f=setInterval(P,1e3)}function P(){const s=Math.random()*(a.width-30);u.push(new w(s,-30))}function y(){p=requestAnimationFrame(y),d.fillStyle="rgba(0, 0, 0, 0.1)",d.fillRect(0,0,a.width,a.height),e.draw(d),e.update(),l.forEach((s,i)=>{s.update(),s.draw(d),s.y+s.radius<0&&l.splice(i,1)}),u.forEach((s,i)=>{s.update(),s.draw(d),Math.hypot(e.x-s.x,e.y-s.y)<e.radius+s.radius&&(cancelAnimationFrame(p),clearInterval(f),alert("游戏结束！得分："+n),g(),y()),l.forEach((h,t)=>{Math.hypot(h.x-s.x,h.y-s.y)<h.radius+s.radius&&(u.splice(i,1),l.splice(t,1),n+=100,v.innerHTML=n)}),s.y>a.height&&u.splice(i,1)})}addEventListener("keydown",({key:s})=>{switch(s){case"ArrowLeft":e.velocity.x=-5;break;case"ArrowRight":e.velocity.x=5;break;case" ":l.push(new T(e.x,e.y));break}});addEventListener("keyup",({key:s})=>{s==="ArrowLeft"&&e.velocity.x<0&&(e.velocity.x=0),s==="ArrowRight"&&e.velocity.x>0&&(e.velocity.x=0)});g();y();