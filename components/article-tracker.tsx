"use client"

import { useEffect } from "react"

export function ArticleTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // #region agent log
    const logAllArticleElements = () => {
      const articleElements = document.querySelectorAll('article');
      const mainElements = document.querySelectorAll('main');
      const sectionElements = document.querySelectorAll('section');
      
      articleElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(el);
        const parent = el.parentElement;
        const parentRect = parent ? parent.getBoundingClientRect() : null;
        const logData = {location:'components/article-tracker.tsx:15',message:'Article element found',data:{index:idx,height:rect.height,width:rect.width,top:rect.top,left:rect.left,scrollHeight:el.scrollHeight,clientHeight:el.clientHeight,overflow:computedStyle.overflow,overflowY:computedStyle.overflowY,maxHeight:computedStyle.maxHeight,minHeight:computedStyle.minHeight,className:el.className,id:el.id,dataAttributes:Array.from(el.attributes).filter(a=>a.name.startsWith('data-')).map(a=>({name:a.name,value:a.value})),childrenCount:el.children.length,parentTag:parent?.tagName,parentHeight:parentRect?.height,parentOverflow:parent?window.getComputedStyle(parent).overflow:'',pathname:window.location.pathname},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'};
        fetch('http://127.0.0.1:7242/ingest/cace0a0d-2960-4685-8e58-7d394a95f449',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logData)}).catch(()=>{});
        if (rect.height > 1000) {
          console.log('[DEBUG] Large article element:', {height: rect.height, className: el.className, maxHeight: computedStyle.maxHeight, overflowY: computedStyle.overflowY});
        }
      });
      
      mainElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(el);
        fetch('http://127.0.0.1:7242/ingest/cace0a0d-2960-4685-8e58-7d394a95f449',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/article-tracker.tsx:25',message:'Main element metrics',data:{index:idx,height:rect.height,width:rect.width,scrollHeight:el.scrollHeight,clientHeight:el.clientHeight,overflow:computedStyle.overflow,className:el.className,childrenCount:el.children.length},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'B'})}).catch(()=>{});
      });
      
      const containerElements = document.querySelectorAll('section.container, .container');
      containerElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(el);
        fetch('http://127.0.0.1:7242/ingest/cace0a0d-2960-4685-8e58-7d394a95f449',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/article-tracker.tsx:32',message:'Container element metrics',data:{index:idx,height:rect.height,width:rect.width,scrollHeight:el.scrollHeight,clientHeight:el.clientHeight,overflow:computedStyle.overflow,className:el.className,tagName:el.tagName,childrenCount:el.children.length},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'C'})}).catch(()=>{});
      });
    };
    // #endregion
    
    // #region agent log
    const injectGlobalStyles = () => {
      // Inject a style tag directly into the document head with maximum specificity
      const styleId = 'article-height-constraint-fix';
      if (document.getElementById(styleId)) return;
      
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        /* Aggressive fix for excessive article heights */
        article[class*="grid-cur"],
        article[data-cursor-element-id],
        main#main > section.container > article,
        main#main > .container > article,
        section.container > article,
        .container > article {
          max-height: calc(100vh - 250px) !important;
          overflow-y: auto !important;
          height: auto !important;
          box-sizing: border-box !important;
        }
        
        /* Constrain parent containers */
        main#main > section.container,
        main#main > .container,
        section.container {
          max-height: 100vh !important;
          overflow-y: auto !important;
        }
      `;
      document.head.appendChild(style);
      console.log('[DEBUG] Injected global style tag for article height constraints');
    };
    
    // #region agent log
    const applyHeightConstraints = () => {
      // Inject global styles first
      injectGlobalStyles();
      
      // Check ALL article elements, not just specific selectors
      const allArticles = document.querySelectorAll('article');
      const constraintHeight = 'calc(100vh - 250px)';
      
      allArticles.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const computedStyle = window.getComputedStyle(htmlEl);
        const rect = htmlEl.getBoundingClientRect();
        const inlineMaxHeight = htmlEl.style.maxHeight;
        const inlineOverflowY = htmlEl.style.overflowY;
        const parent = htmlEl.parentElement;
        
        // #region agent log
        const logData = {
          location: 'components/article-tracker.tsx:45',
          message: 'Article element analyzed',
          data: {
            height: rect.height,
            scrollHeight: htmlEl.scrollHeight,
            clientHeight: htmlEl.clientHeight,
            className: htmlEl.className,
            id: htmlEl.id,
            dataAttributes: Array.from(htmlEl.attributes).filter(a => a.name.startsWith('data-')).map(a => ({ name: a.name, value: a.value })),
            computedMaxHeight: computedStyle.maxHeight,
            computedOverflowY: computedStyle.overflowY,
            inlineMaxHeight: inlineMaxHeight,
            inlineOverflowY: inlineOverflowY,
            parentTag: parent?.tagName,
            parentClass: parent?.className,
            pathname: window.location.pathname,
            isConstrained: htmlEl.getAttribute('data-height-constrained') === 'true'
          },
          timestamp: Date.now(),
          sessionId: 'debug-session',
          runId: 'post-fix-v2',
          hypothesisId: 'E'
        };
        fetch('http://127.0.0.1:7242/ingest/cace0a0d-2960-4685-8e58-7d394a95f449', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(logData) }).catch(() => {});
        
        // Log large articles
        if (rect.height > 1500) {
          console.log('[DEBUG] Large article found:', {
            height: rect.height,
            className: htmlEl.className,
            computedMaxHeight: computedStyle.maxHeight,
            inlineMaxHeight: inlineMaxHeight,
            isConstrained: htmlEl.getAttribute('data-height-constrained')
          });
        }
        
        // Also constrain parent containers
        if (parent) {
          const parentRect = parent.getBoundingClientRect();
          const parentStyle = window.getComputedStyle(parent);
          if (parentRect.height > 2000 && (parent.classList.contains('container') || parent.tagName === 'SECTION')) {
            (parent as HTMLElement).style.setProperty('max-height', '100vh', 'important');
            (parent as HTMLElement).style.setProperty('overflow-y', 'auto', 'important');
            console.log('[DEBUG] Constrained parent container:', {
              tag: parent.tagName,
              className: parent.className,
              height: parentRect.height
            });
          }
        }
        
        // Apply constraint if height is excessive (lowered threshold to 1500px)
        if (rect.height > 1500) {
          // Use setProperty with important flag for maximum priority
          htmlEl.style.setProperty('max-height', constraintHeight, 'important');
          htmlEl.style.setProperty('overflow-y', 'auto', 'important');
          htmlEl.style.setProperty('height', 'auto', 'important');
          htmlEl.style.setProperty('box-sizing', 'border-box', 'important');
          
          // Also try setting on the element's style attribute directly
          htmlEl.setAttribute('style', 
            htmlEl.getAttribute('style') + 
            `; max-height: ${constraintHeight} !important; overflow-y: auto !important; height: auto !important; box-sizing: border-box !important;`
          );
          
          // Mark as constrained
          htmlEl.setAttribute('data-height-constrained', 'true');
          
          console.log('[DEBUG] Applied constraint to article:', {
            height: rect.height,
            className: htmlEl.className,
            appliedMaxHeight: htmlEl.style.maxHeight,
            appliedOverflowY: htmlEl.style.overflowY,
            inlineStyle: htmlEl.getAttribute('style')
          });
          
          // Verify the constraint was applied after a short delay
          setTimeout(() => {
            const newRect = htmlEl.getBoundingClientRect();
            const newComputedStyle = window.getComputedStyle(htmlEl);
            if (newRect.height > 2000) {
              console.warn('[DEBUG] Constraint verification failed!', {
                height: newRect.height,
                computedMaxHeight: newComputedStyle.maxHeight,
                inlineMaxHeight: htmlEl.style.maxHeight,
                className: htmlEl.className,
                allStyles: Array.from(htmlEl.style).map(prop => `${prop}: ${htmlEl.style.getPropertyValue(prop)}`)
              });
              
              // Try even more aggressive approach - remove height entirely and force constraint
              htmlEl.style.removeProperty('height');
              htmlEl.style.setProperty('max-height', constraintHeight, 'important');
              htmlEl.style.setProperty('overflow-y', 'auto', 'important');
            }
          }, 100);
        }
        // #endregion
      });
    };
    // #region agent log
    // Continuous monitoring using requestAnimationFrame for real-time constraint application
    let rafId: number;
    const continuousMonitor = () => {
      const allArticles = document.querySelectorAll('article');
      const constraintHeight = 'calc(100vh - 250px)';
      
      allArticles.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const rect = htmlEl.getBoundingClientRect();
        
        // If height is excessive, continuously apply constraint
        if (rect.height > 1500) {
          // Use multiple methods to ensure constraint is applied
          htmlEl.style.setProperty('max-height', constraintHeight, 'important');
          htmlEl.style.setProperty('overflow-y', 'auto', 'important');
          htmlEl.style.setProperty('height', 'auto', 'important');
          htmlEl.style.setProperty('box-sizing', 'border-box', 'important');
          
          // Also set via direct style manipulation
          const currentStyle = htmlEl.getAttribute('style') || '';
          if (!currentStyle.includes('max-height') || !currentStyle.includes(constraintHeight)) {
            htmlEl.setAttribute('style', 
              currentStyle + 
              ` max-height: ${constraintHeight} !important; overflow-y: auto !important; height: auto !important; box-sizing: border-box !important;`
            );
          }
          
          // Constrain parent if needed
          const parent = htmlEl.parentElement;
          if (parent && (parent.classList.contains('container') || parent.tagName === 'SECTION')) {
            const parentRect = parent.getBoundingClientRect();
            if (parentRect.height > 2000) {
              (parent as HTMLElement).style.setProperty('max-height', '100vh', 'important');
              (parent as HTMLElement).style.setProperty('overflow-y', 'auto', 'important');
            }
          }
        }
      });
      
      rafId = requestAnimationFrame(continuousMonitor);
    };
    
    // Start continuous monitoring
    rafId = requestAnimationFrame(continuousMonitor);
    // #endregion
    
    logAllArticleElements();
    injectGlobalStyles();
    applyHeightConstraints();
    const timeoutId = setTimeout(() => { logAllArticleElements(); applyHeightConstraints(); }, 100);
    const intervalId = setInterval(() => { logAllArticleElements(); applyHeightConstraints(); }, 2000);
    // #endregion
    
    // #region agent log
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldLog = false;
      let articleAdded = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              const el = node as HTMLElement;
              if (el.tagName === 'ARTICLE' || el.querySelector?.('article')) {
                articleAdded = true;
                console.log('[DEBUG] Article element added to DOM:', {
                  className: el.className,
                  id: el.id,
                  height: el.getBoundingClientRect().height
                });
              }
            }
          });
          if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
            shouldLog = true;
          }
        }
        if (mutation.type === 'attributes') {
          const target = mutation.target as HTMLElement;
          if (target.tagName === 'ARTICLE' && (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
            console.log('[DEBUG] Article attribute changed:', {
              attribute: mutation.attributeName,
              className: target.className,
              height: target.getBoundingClientRect().height
            });
            shouldLog = true;
            // Immediately apply constraints if article height is excessive
            setTimeout(applyHeightConstraints, 10);
          }
        }
      });
      
      if (articleAdded) {
        // New article added - apply constraints immediately
        setTimeout(() => {
          applyHeightConstraints();
          logAllArticleElements();
        }, 50);
      } else if (shouldLog) {
        setTimeout(() => {
          logAllArticleElements();
          applyHeightConstraints();
        }, 50);
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style', 'data-cursor-element-id'] });
    // #endregion
    
    // #region agent log
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (el.tagName === 'ARTICLE' && entry.contentRect.height > 1500) {
          console.log('[DEBUG] Article resized to excessive height:', {
            height: entry.contentRect.height,
            className: el.className
          });
          applyHeightConstraints();
        }
      });
      logAllArticleElements();
    });
    
    // Observe all existing articles
    document.querySelectorAll('article').forEach((el) => {
      resizeObserver.observe(el);
    });
    
    // Also observe containers that might contain articles
    document.querySelectorAll('main, section.container, .container').forEach((el) => {
      resizeObserver.observe(el);
    });
    
    // Re-observe when new articles are added
    const observeNewArticles = () => {
      document.querySelectorAll('article').forEach((el) => {
        if (!(el as any).__observed) {
          resizeObserver.observe(el);
          (el as any).__observed = true;
        }
      });
    };
    setInterval(observeNewArticles, 1000);
    // #endregion
    
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return null;
}

