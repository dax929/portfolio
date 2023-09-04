// スロットリング関数
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func(...args);
  };
}

// デバウンス関数
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// vw,vhの定義
const setScaleReFunc = (() => {
  const setScaleFunc = () => {
    let vw = window.innerWidth * 0.01;
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vw', `${vw}px`);
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  setScaleFunc();

  window.addEventListener('resize',() => {
    setScaleFunc();
  })
})();

// DOM要素の取得
const DOMList = (() => {
  return {
    'cursorDot': document.querySelector('.p-cursor__item.--dot'),
    'cursorFollower': document.querySelector('.p-cursor__item.--follower'),

    'progress': document.querySelector('.p-progress'),
    'progressBar': document.querySelector('.p-progress__bar'),
    'progressTitle': document.querySelector('.p-progress__title'),
    'progressNum': document.querySelector('.p-progress__num'),
    'progressBgList': document.querySelectorAll('.p-progress__bg'),

    'bgTextList': document.querySelectorAll('.p-bg-text'),
    'bgCp': document.querySelector('.p-bg-cp'),
    'bgCpImg': document.querySelector('.p-bg-cp__img'),
    'bgImg': document.querySelector('.p-bg-img'),

    'slideImgList': document.querySelectorAll('.p-bg-img__slide'),
    'slideImgAbout': document.querySelector('.p-bg-img__slide.--about'),
    'slideImgWorks': document.querySelector('.p-bg-img__slide.--works'),
    'slideImgAboutWrapper': document.querySelector('.p-bg-img__slide-wrapper.--about'),
    'slideImgWorksWrapper': document.querySelector('.p-bg-img__slide-wrapper.--works'),

    'tap': document.querySelector('.p-tap'),
    'tapBtn': document.querySelector('.p-tap__btn'),

    'nav': document.querySelector('.p-nav'),
    'aboutLink': document.querySelector('.p-nav__link.--about'),
    'aboutText': document.querySelector('.--about > .p-nav__text'),
    'aboutBar': document.querySelector('.--about > .p-nav__bar'),
    'worksLink': document.querySelector('.p-nav__link.--works'),
    'worksText': document.querySelector('.--works > .p-nav__text'),
    'worksBar': document.querySelector('.--works > .p-nav__bar'),

    'aboutPage': document.querySelector('.p-page.--about'),
    'worksPage': document.querySelector('.p-page.--works')
  }
})();

// イベントフラッグ
const eventFlag = (() => {
  return {
    'navClick': false,
    'pageCover': false,
    'pageFixed': false,
    'clipPath': true
  }
})();

// ロード画面設定
$(function(){
  const setLoadFunc = (() => {
    const progressBar = DOMList['progressBar'];
    const progressNum = DOMList['progressNum'];

    let imgLoad = imagesLoaded('body');
    let imgTotal = imgLoad.images.length;
    let imgLoaded = 0;
    let current = 0;
    
    imgLoad.on('progress', () => {
        imgLoaded++;
    });

    const updateProgressFunc = () => {
      let  target = (imgLoaded / imgTotal) * 100;
      current += (target - current) * 0.1;

      // レスポンシブ対応
      let winW = window.innerWidth;

      if(winW > 600){
        progressBar.style.width = current * 3.2 + 'px';
      }else{
        progressBar.style.width = current * 2.5 + 'px';
      }
      progressNum.innerText = Math.floor(current) + '%';

      if(current === 100) {
        clearInterval(progressTimer);

        completeLoadFunc();
        
      }else if(current > 99.9) {
        current = 100;
      }
    }

    let progressTimer = setInterval(updateProgressFunc, 1000 / 60);
  })();

  const completeLoadFunc = () => {
    const progress = DOMList['progress'];
    const progressBar = DOMList['progressBar'];
    const progressTitle = DOMList['progressTitle'];
    const progressNum = DOMList['progressNum'];
    const progressBgList = DOMList['progressBgList'];
    
    const bgTextList = DOMList['bgTextList'];
    const bgCp = DOMList['bgCp'];
    const bgCpImg  = DOMList['bgCpImg'];
    const bgImg = DOMList['bgImg'];

    const tap = DOMList['tap'];

    Promise.resolve().then(() => {
      return new Promise((resolve) => {
        // progressBar
        progressBar.classList.add('is-load-complete');
        progressBar.removeAttribute('style');
        resolve();
      })
    }).then(() => {
      return new Promise((resolve) => {
        // progressNum
        setTimeout(() => {
          progressNum.classList.add('is-hidden');
          resolve();
        },500);
      })
    }).then(() => {
      return new Promise((resolve) => {
        // colorInversion
        setTimeout(() => {
          for(bg of progressBgList){
            bg.classList.add('is-inversion');
          }
          resolve();
        },500);
      })
    }).then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          progressBar.classList.add('is-complete');
          progressTitle.classList.add('is-complete');

          // colorInversionを消去
          progress.classList.add('is-complete');
          for(bg of progressBgList){
            bg.classList.add('is-hidden');
          }

          // bgの表示
          bgCp.classList.add('is-appear');
          bgCpImg.classList.add('is-appear');
          bgImg.classList.add('is-appear');

          resolve();
        },2200);
      })
    }).then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          for(bgText of bgTextList){
            bgText.classList.add('is-slide');
          }
          resolve();
        },10);
      })
    }).then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          progressBar.classList.add('is-hidden');
          tap.classList.add('is-appear');
          resolve();
        },100);
      })
    })
  }
})

// カーソル設定
const handleCursorFunc = (() => {
  const cursorDot = DOMList['cursorDot'];
  const cursorFollower = DOMList['cursorFollower'];
  const dotSize = cursorDot.clientWidth;
  const followerSize= cursorFollower.clientWidth;

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove' , (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;

    const translateCursorFunc = (cursor,size) => {
      cursor.style.transform = 'translate(' + (mouseX - size / 2) + 'px,' + (mouseY - size / 2) + 'px)';
    }

    translateCursorFunc(cursorDot,dotSize);
    translateCursorFunc(cursorFollower,followerSize);
  })

  document.addEventListener('mouseleave',() => {
    cursorDot.classList.add('is-none');
    cursorFollower.classList.add('is-none');
  })

  document.addEventListener('mouseenter',() => {
    cursorDot.classList.remove('is-none');
    cursorFollower.classList.remove('is-none');
  })

})();

// クリップパスアニメーション
const handleClipPathFunc = (() => {
  const handleFunc = () => {
    // DOM要素を定義
    const boxSuffixes = ['a', 'b', 'c', 'd', 'e', 'f'];
    const boxObject = {};
    for (let suffix of boxSuffixes) {
      boxObject[`box${suffix.toUpperCase()}`] = document.querySelector(`.p-bg-cp__box.--${suffix}`);
    }
    const boxList = Object.keys(boxObject);
    
    let sizeData = getSizeDataFunc(boxList);

    const updateSizeData = () => {
      sizeData = getSizeDataFunc(boxList);
    }

    const throttledMouseMove = throttle((e) => {
      if(eventFlag['clipPath']){
        handleMouseMove(e, boxObject, boxList, sizeData);
      }
    }, 20); 

    document.addEventListener('mousemove', throttledMouseMove);

    window.addEventListener('resize', debounce(() => {
      updateSizeData();
    }, 250));
  }

  // サイズに関する変数を定義 → リサイズごとに発火
  const getSizeDataFunc = (boxList) => {
    const handleFunc = () => {
      let winW = window.innerWidth;
      let winH = window.innerHeight;
      let boxSize = winW / 6;

      const defaultPos = getDefaultPosFunc(winH,boxSize);
      const moveRange = getMoveRangeFunc(winH,boxSize,defaultPos);

      const storeSizeData = {
        'winW': winW,
        'winH': winH,
        'boxSize': boxSize,
        'defaultPos': defaultPos,
        'moveRange': moveRange
      }
      return storeSizeData;
    }

    const getDefaultPosFunc = (winH,boxSize) => {
      const storeDefaultPos = {
        'boxA': {'x':0 , 'y':(winH / 2 - boxSize)},
        'boxB': {'x':boxSize , 'y':(winH / 2)},
        'boxC': {'x':(boxSize * 1.5) , 'y':0},
        'boxD': {'x':(boxSize * 3.5) , 'y':(winH - boxSize)},
        'boxE': {'x':(boxSize * 4) , 'y':(winH / 2 - boxSize)},
        'boxF': {'x':(boxSize * 5) , 'y':(winH / 2)}
      }
      return storeDefaultPos;
    }

    const getMoveRangeFunc = (winH,boxSize,defaultPos) => {
      const handleFunc = () => {        
        const valueObject = {
          'leftEnd': createValues(boxSize * 3,boxSize * 3,boxSize * 4,boxSize * 4,boxSize * 5,boxSize * 5),
          'topEnd': createValues(winH - boxSize * 2,winH - boxSize,winH - boxSize * 2,winH - boxSize,winH - boxSize * 2,winH - boxSize),
          'rightStart': createValues(0,0,boxSize,boxSize,boxSize * 2,boxSize * 2),
          'bottomStart': createValues(0,boxSize,0,boxSize,0,boxSize)
        }
        
        const storeMoveRange = {
          'topLeft': createRange(),
          'topRight': createRange(),
          'bottomLeft': createRange(),
          'bottomRight': createRange()
        };

        const areaList = Object.keys(storeMoveRange);
        for(area of areaList){
          for(box of boxList){
            storeMoveRange[area][box] = getAreaPattenFunc(area,box,valueObject);
          }
        }

        return storeMoveRange;
      }
      
      const createValues = (boxA, boxB, boxC, boxD, boxE, boxF) => {
        return {
            'boxA': boxA,
            'boxB': boxB,
            'boxC': boxC,
            'boxD': boxD,
            'boxE': boxE,
            'boxF': boxF
        };
      };

      const createRange = () => {
        return {
          'boxA': {},
          'boxB': {},
          'boxC': {},
          'boxD': {},
          'boxE': {},
          'boxF': {},
        };
      }

      const getAreaPattenFunc = (area,box,valueObject) => {
        const handleFunc = () => {
          const DX = defaultPos[box]['x'];
          const DY = defaultPos[box]['y'];
          const left = valueObject['leftEnd'][box];
          const right = valueObject['rightStart'][box];
          const top = valueObject['topEnd'][box];
          const bottom = valueObject['bottomStart'][box];
          switch (area){
            case 'topLeft':
              return createPattenFunc(DX,DY,left,top);

            case 'topRight':
              return createPattenFunc(right,DY,DX,top);
    
            case 'bottomLeft':
              return createPattenFunc(DX,bottom,left,DY);
        
            case 'bottomRight':
              return createPattenFunc(right,bottom,DX,DY);

            default:
              break;
          }
        }

        const createPattenFunc = (startX,startY,endX,endY) => {
          const handleFunc = () => {
            let storePatten = {
              'startX': startX,
              'startY': startY,
              'endX': endX,
              'endY': endY
            }

            calcRangeFunc(storePatten);
            return storePatten;
          }

          const calcRangeFunc = (storePatten) => {
            storePatten['rangeX'] = storePatten['endX'] - storePatten['startX'];
            storePatten['rangeY'] = storePatten['endY'] - storePatten['startY'];
          }

          return handleFunc();
        }

        return handleFunc();
      }

      return handleFunc();
    };

    return handleFunc();
  }

  // mouseMove時の動作
  const handleMouseMove = (e,boxObject,boxList,sizeData) => {
    const handleFunc = () => {
      const winW = sizeData['winW'];
      const winH = sizeData['winH'];
      const defaultPos = sizeData['defaultPos'];
      const moveRange = sizeData['moveRange'];

      let mouseX = e.pageX;
      let mouseY = e.pageY;

      // mouseAreaの取得
      let mouseArea = getMouseAreaFunc(winW,winH,mouseX,mouseY);

      //
      for(box of boxList){
        // 移動先を計算
        let boxPos = getPosFunc(box,winW,winH,defaultPos,moveRange,mouseX,mouseY,mouseArea);
        // 移動
        moveBoxFunc(box,boxPos);
      }
    }

    // mouseAreaの取得関数
    const getMouseAreaFunc = (winW,winH,mouseX,mouseY) => {
      let storeMouseArea;
      if(mouseY <= (winH / 2)){
        if(mouseX <= (winW / 2)){
          storeMouseArea = 'topLeft';
        }else{
          storeMouseArea = 'topRight';
        }
      }else{
        if(mouseX <= (winW / 2)){
          storeMouseArea = 'bottomLeft';
        }else{
          storeMouseArea = 'bottomRight';
        }
      }
      return storeMouseArea;
    }

    // 移動先の取得
    const getPosFunc = (box,winW,winH,defaultPos,moveRange,mouseX,mouseY,mouseArea) => {
      const rangeX = moveRange[mouseArea][box]['rangeX'];
      const rangeY = moveRange[mouseArea][box]['rangeY'];

      let storePos = {
        'x': defaultPos[box]['x'] + ((rangeX * ((winW / 2) - mouseX)) / (winW / 2)),
        'y': defaultPos[box]['y'] + ((rangeY * ((winH / 2) - mouseY)) / (winH / 2))
      }
      return storePos;
    }

    // 移動関数
    const moveBoxFunc = (box,boxPos) => {
      boxObject[box].style.transform = 
      'translate(' + boxPos['x'] + 'px,' + boxPos['y'] + 'px)' 
    };

    handleFunc();
  };

  handleFunc();
})();

// TAPボタン
const handleTapFunc = (() => {
  const handleFunc = () => {
    const tap = DOMList['tap'];
    const tapBtn = DOMList['tapBtn'];

    handleTapHoverFunc(tapBtn);
    handleTapClickFunc(tap,tapBtn);    
  }

  const handleTapHoverFunc = (tapBtn) => {
    const cursorDot = DOMList['cursorDot'];
    const cursorFollower = DOMList['cursorFollower'];

    tapBtn.addEventListener('mouseenter',() => {
      cursorDot.classList.add('is-hidden');
      cursorFollower.classList.add('is-hidden');
    })

    tapBtn.addEventListener('mouseleave',() => {
      cursorDot.classList.remove('is-hidden');
      cursorFollower.classList.remove('is-hidden');
    })
  }

  const handleTapClickFunc = (tap,tapBtn) => {
    const handleFunc = () => {
      tapBtn.addEventListener('click',() => {
        const bgTextList = DOMList['bgTextList'];
        const slideImgList = DOMList['slideImgList'];
        const nav = DOMList['nav'];

        Promise.resolve().then(() => {
          return new Promise((resolve) => {
            eventFlag['clipPath'] = false;
            tapBtn.classList.add('is-active');
            tapBtn.classList.add('is-mouse-inactive');
            for(text of bgTextList){
              text.style.transition = '1s';
              text.classList.remove('is-slide');
            }
            resolve();
          })
        }).then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              deleteFunc('hidden');
              resolve();
            },100);
          })
        }).then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              for(img of slideImgList){
                img.classList.remove('is-slide-out');
              }
              nav.classList.add('is-visible');
              resolve();
            },550);
          })
        }).then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              nav.classList.add('is-appear');
              resolve();
            },800);
          })
        }).then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              for(text of bgTextList){
                text.classList.add('is-none');
              }
              tap.classList.add('is-none');
              deleteFunc('none');
              resolve();
            },1000);
          })
        })
      })
    }

    const deleteFunc = (action) => {
      const deleteList = [
        DOMList['progress'],
        DOMList['progressBar'],
        DOMList['progressTitle'],
        DOMList['bgCp'],
        DOMList['bgCpImg']
      ];

      for(del of deleteList){
        switch (action) {
          case 'hidden':
            del.style.transition = '.3s';
            del.classList.remove('is-appear');
            del.classList.add('is-hidden');
            break;

          case 'none':
            del.classList.add('is-none');
        
          default:
            break;
        }
      }
    }

    handleFunc();
  }

  handleFunc();
})();

// navホバー
const handleSlideImgFunc = (() => {
  const handleFunc = () => {
    const slideImgAbout = DOMList['slideImgAbout'];
    const slideImgWorks = DOMList['slideImgWorks'];
    const aboutLink = DOMList['aboutLink'];
    const worksLink = DOMList['worksLink'];
    const aboutPage = DOMList['aboutPage'];
    const worksPage = DOMList['worksPage'];

    const about = {
      'link': aboutLink,
      'img': slideImgAbout,
      'page': aboutPage
    }
    const works = {
      'link': worksLink,
      'img': slideImgWorks,
      'page': worksPage
    }

    handleHoverFunc(about,works);
    handleHoverFunc(works,about);
  }

  const handleHoverFunc = (target,another) => {
    const handleFunc = () => {
      const targetLink = target['link'];
      const throttledLinkEnter = throttle((e) => {
        // フラッグによって参照する関数を変更する。
        if(eventFlag['navClick']){
          handlePageCover(e,target,another);
        }else{
          handleLinkEnter(e,target);
        }
      }, 100); 
  
      const throttledLinkLeave = throttle((e) => {
        if(eventFlag['navClick']){
          if(eventFlag['pageFixed']){
            eventFlag['pageFixed'] = false;
          }else{            
            handlePageUncover(e,target,another);
          }
        }else{
          handleLinkLeave(e,target);
        }
      }, 100);

      targetLink.addEventListener('mouseenter',throttledLinkEnter);
      targetLink.addEventListener('mouseleave',throttledLinkLeave);
    }
    
    const handleLinkEnter = (e,target) => {
      const link = target['link'];
      const img = target['img'];

      img.style.transition = '.7s';
      link.classList.add('is-hover');
      img.classList.add('is-slide-out');
    }

    const handleLinkLeave = (e,target) => {
      const link = target['link'];
      const img = target['img'];

      link.classList.remove('is-hover');
      img.classList.remove('is-slide-out');
    }

    const handlePageCover = (e,target,another) => {
      eventFlag['pageCover'] = true;

      const targetImg = target['img'];
      const anotherImg = another['img'];
      const targetLink = target['link'];
      const anotherLink = another['link'];
      const targetPage = target['page'];
      const anotherPage = another['page'];

      targetImg.classList.add('is-slide-out');
      anotherImg.classList.remove('is-slide-out');
      anotherImg.classList.add('is-cover');

      targetLink.classList.add('is-hover');
      anotherLink.classList.remove('is-hover');

      targetPage.classList.remove('is-none');
      anotherPage.classList.add('is-hidden');
    }

    const handlePageUncover = (e,target,another) => {
      const targetImg = target['img'];
      const anotherImg = another['img'];
      const targetLink = target['link'];
      const anotherLink = another['link'];
      const targetPage = target['page'];
      const anotherPage = another['page'];

      if(eventFlag['pageCover']){
        targetImg.classList.remove('is-slide-out');
        anotherImg.classList.remove('is-cover');
        anotherImg.classList.add('is-slide-out');

        targetLink.classList.remove('is-hover');
        anotherLink.classList.add('is-hover');

        targetPage.classList.add('is-none');
        anotherPage.classList.remove('is-hidden');
      }
    }

    handleFunc();
  }
  handleFunc();
})();

// ナビクリック
const handleNavClickFunc = (() => {
  const handleFunc = () => {
    const slideImgAbout = DOMList['slideImgAbout'];
    const slideImgWorks = DOMList['slideImgWorks'];
    const slideImgAboutWrapper = DOMList['slideImgAboutWrapper'];
    const slideImgWorksWrapper = DOMList['slideImgWorksWrapper'];
    const aboutLink = DOMList['aboutLink'];
    const worksLink = DOMList['worksLink'];
    const aboutBar = DOMList['aboutBar'];
    const worksBar = DOMList['worksBar'];
    const aboutPage = DOMList['aboutPage'];
    const worksPage = DOMList['worksPage'];
  
    const about = {
      'link': aboutLink,
      'img': slideImgAbout,
      'imgWrapper': slideImgAboutWrapper,
      'bar': aboutBar,
      'page': aboutPage
    }
    const works = {
      'link': worksLink,
      'img': slideImgWorks,
      'imgWrapper': slideImgWorksWrapper,
      'bar': worksBar,
      'page': worksPage
    }

    clickNavFunc(about,works);
    clickNavFunc(works,about);
  }

  const clickNavFunc = (target,another) => {
    target['link'].addEventListener('click',() => {
      // フラッグによって分岐
      const targetLink = target['link'];
      const anotherLink = another['link'];
      const targetImgWrapper = target['imgWrapper'];
      const anotherImgWrapper = another['imgWrapper'];
      const targetImg = target['img'];
      const anotherImg = another['img'];
      const targetPage = target['page'];
      const anotherPage = another['page'];

      if(!eventFlag['navClick']){
        // navクリック初回
        eventFlag['navClick'] = true;

        targetImg.style.transition = '.7s';
        anotherImg.style.transition = '.7s';

        targetLink.classList.add('is-active');
        anotherLink.classList.add('is-active');
        targetImgWrapper.classList.add('is-active');
        anotherImgWrapper.classList.add('is-active');

        targetImg.classList.remove('is-slide-out');
        targetImg.classList.add('is-slide-out');
        anotherImg.classList.remove('is-slide-out');

        targetLink.classList.add('is-fixed');
        
        targetPage.classList.remove('is-hidden');
        targetPage.classList.remove('is-mouse-inactive');
        anotherPage.classList.add('is-none');
      }else{
        // navクリック繰り返し
        eventFlag['pageFixed'] = true;
        targetLink.classList.add('is-fixed');
        anotherLink.classList.remove('is-fixed');
        
        anotherImg.classList.remove('is-cover');

        targetPage.classList.remove('is-hidden');
        targetPage.classList.remove('is-mouse-inactive');
        anotherPage.classList.add('is-none');
        anotherPage.classList.add('is-mouse-inactive');
      }
    })
  }

  handleFunc();
})();
