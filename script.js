       // 在script.js中添加導覽功能
document.addEventListener('DOMContentLoaded', function() {
    // 獲取所有導覽項目和內容頁面
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-content');
    
    // 為每個導覽項目添加點擊事件
    navItems.forEach(function(item, index) {
        item.addEventListener('click', function() {
            // 隱藏所有頁面
            pages.forEach(function(page) {
                page.style.display = 'none';
            });
            
            // 顯示對應的頁面
            pages[index].style.display = 'block';
            
            // 更新導覽項目的活動狀態
            navItems.forEach(function(navItem) {
                navItem.classList.remove('active');
            });
            item.classList.add('active');
        });
    });
});
       // 照片集合
        const photos = [
            'LINE_ALBUM_1.jpg', // 原始照片
            'LINE_ALBUM_2.jpg', // 請替換為實際照片路徑
            'LINE_ALBUM_3.jpg', 
            'LINE_ALBUM_4.jpg',
            'LINE_ALBUM_5.jpg'
        ];
        
        // 當前顯示的照片索引
        let currentPhotoIndex = 0;
        
        // 設置照片背景
        document.addEventListener('DOMContentLoaded', function() {
            // 初始載入第一張照片
            updatePhoto(0);
            
            // 創建照片導航點
            createPhotoNavDots();
            
            // 初始化頁面切換功能
            initPageNavigation();
        });
        
        // 更新照片顯示
        function updatePhoto(index, withTransition = true) {
            currentPhotoIndex = index;
            
            const mainPhoto = document.getElementById('main-photo');
            const parallaxLayer = document.getElementById('parallax-layer');
            
            // 如果不需要過渡效果，先移除動畫
            if (!withTransition) {
                mainPhoto.style.transition = 'none';
                parallaxLayer.style.transition = 'none';
                // 強制重繪
                void mainPhoto.offsetWidth;
            }
            
            // 設置背景圖片
            mainPhoto.style.backgroundImage = `url('${photos[index]}')`;
            parallaxLayer.style.backgroundImage = `url('${photos[index]}')`;
            
            // 恢復過渡效果
            if (!withTransition) {
                setTimeout(() => {
                    mainPhoto.style.transition = 'background-image 1s ease-in-out';
                    parallaxLayer.style.transition = 'transform 0.5s ease-out, background-image 1s ease-in-out';
                }, 50);
            }
            
            // 更新導航點的活動狀態
            updateNavDots(index);
        }
        
        // 創建照片導航點
        function createPhotoNavDots() {
            const photoNav = document.getElementById('photo-nav');
            photoNav.innerHTML = '';
            
            // 為每張照片創建一個導航點
            photos.forEach((photo, index) => {
                const dot = document.createElement('div');
                dot.classList.add('photo-dot');
                if (index === currentPhotoIndex) {
                    dot.classList.add('active');
                }
                
                // 點擊導航點切換照片
                dot.addEventListener('click', () => {
                    updatePhoto(index);
                });
                
                photoNav.appendChild(dot);
            });
        }
        
        // 更新導航點狀態
        function updateNavDots(activeIndex) {
            const dots = document.querySelectorAll('.photo-dot');
            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // 隨機切換照片
        function randomPhoto() {
            // 隨機選擇一個不同於當前的索引
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * photos.length);
            } while (newIndex === currentPhotoIndex && photos.length > 1);
            
            updatePhoto(newIndex);
        }
        
        
        // 視差效果
        const parallaxLayer = document.getElementById('parallax-layer');
        const container = document.querySelector('.container');
        
        container.addEventListener('mousemove', (e) => {
            const xPos = (e.clientX / window.innerWidth) - 0.5;
            const yPos = (e.clientY / window.innerHeight) - 0.5;
            
            parallaxLayer.style.transform = `translateX(${xPos * 20}px) translateY(${yPos * 20}px)`;
        });
        
        // 心花綻放效果
        document.getElementById('effect1').addEventListener('click', function() {
            createHearts();
            randomPhoto(); // 隨機切換照片
        });
        
        function createHearts() {
            const heartsContainer = document.getElementById('hearts-container');
            const heartSymbols = ['❤️', '💕', '💖', '💘', '💗'];
            
            for(let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.classList.add('heart');
                    heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
                    heart.style.left = Math.random() * 100 + '%';
                    heart.style.top = (Math.random() * 50 + 50) + '%';
                    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
                    heartsContainer.appendChild(heart);
                    
                    setTimeout(() => {
                        heart.remove();
                    }, 8000);
                }, i * 100);
            }
        }
        
        // 照片拼圖效果
        document.getElementById('effect2').addEventListener('click', function() {
            createPhotoPieces();
            randomPhoto(); // 隨機切換照片
        });
        
        function createPhotoPieces() {
            const piecesContainer = document.getElementById('pieces-container');
            piecesContainer.innerHTML = '';
            
            const rows = 5;
            const cols = 5;
            const pieceWidth = 100 / cols;
            const pieceHeight = 100 / rows;
            const photoUrl = photos[currentPhotoIndex];
            
            for(let i = 0; i < rows; i++) {
                for(let j = 0; j < cols; j++) {
                    const piece = document.createElement('div');
                    piece.classList.add('photo-piece');
                    piece.style.width = pieceWidth + '%';
                    piece.style.height = pieceHeight + '%';
                    piece.style.left = (j * pieceWidth) + '%';
                    piece.style.top = (i * pieceHeight) + '%';
                    piece.style.backgroundImage = `url('${photoUrl}')`;
                    piece.style.backgroundPosition = `-${j * pieceWidth * 5}% -${i * pieceHeight * 5}%`;
                    piece.style.animationDelay = (Math.random() * 1.5) + 's';
                    
                    piecesContainer.appendChild(piece);
                }
            }
            
            setTimeout(() => {
                piecesContainer.innerHTML = '';
            }, 4000);
        }
        
        // 漂浮星光效果
        document.getElementById('effect3').addEventListener('click', function() {
            createStars();
            randomPhoto(); // 隨機切換照片
        });
        
        function createStars() {
            const heartsContainer = document.getElementById('hearts-container');
            const starSymbols = ['✨', '⭐', '🌟', '💫', '🌠'];
            
            for(let i = 0; i < 40; i++) {
                setTimeout(() => {
                    const star = document.createElement('div');
                    star.classList.add('heart'); // 重用心形的動畫樣式
                    star.innerHTML = starSymbols[Math.floor(Math.random() * starSymbols.length)];
                    star.style.left = Math.random() * 100 + '%';
                    star.style.top = Math.random() * 100 + '%';
                    star.style.fontSize = (Math.random() * 15 + 10) + 'px';
                    star.style.animationDuration = (Math.random() * 10 + 5) + 's';
                    heartsContainer.appendChild(star);
                    
                    setTimeout(() => {
                        star.remove();
                    }, 10000);
                }, i * 80);
            }
        }
        
        // 頁面加載時自動觸發一些效果
        setTimeout(createHearts, 2500);
        
        // 自動輪播照片 (可選功能)
        let autoSlideInterval;
        
        function startAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(() => {
                const nextIndex = (currentPhotoIndex + 1) % photos.length;
                updatePhoto(nextIndex);
            }, 10000); // 每10秒切換一次
        }
        
        // 當用戶與頁面互動後停止自動輪播
        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }
        
        // 開始自動輪播
        startAutoSlide();
        
        // 用戶互動時停止自動輪播
        document.addEventListener('click', stopAutoSlide);
        document.addEventListener('touchstart', stopAutoSlide);
        
        // 在移動裝置上也能有類似視差效果
        window.addEventListener('deviceorientation', (e) => {
            if (e.beta && e.gamma) {
                const xPos = (e.gamma / 60);
                const yPos = (e.beta / 60);
                
                parallaxLayer.style.transform = `translateX(${xPos * 20}px) translateY(${yPos * 20}px)`;
            }
        });

        //待辦事項功能
        const addBtn = document.getElementById("add-todo-btn");
        const todoList = document.getElementById("todo-list");
        const todoInput = document.getElementById("todo-input");
        const clearBtn = document.getElementById("clear-todo-btn");
        const revertBtn = document.getElementById("revert-todo-btn");
        
        // 存儲被刪除的項目，用於"復原"功能
        let deletedItems = [];
        
        // 保存待辦事項到 localStorage
        function saveTodos() {
            const todos = [];
            Array.from(todoList.children).forEach(item => {
                todos.push({
                    text: item.querySelector(".todo-text").textContent,
                    checked: item.querySelector(".to-do-checkbox").checked
                });
            });
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        
        // 從 localStorage 加載待辦事項
        function loadTodos() {
            const savedTodos = localStorage.getItem('todos');
            if (savedTodos) {
                const todos = JSON.parse(savedTodos);
                todos.forEach(todo => {
                    createTodoItem(todo.text, todo.checked);
                });
            }
        }
        
        // 創建新的待辦事項項目
        function createTodoItem(text, checked = false) {
            // 創建列表項目
            const listItem = document.createElement("li");
        
            // 創建打勾方塊
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "to-do-checkbox";
            checkbox.checked = checked;
        
            // 創建文字容器
            const textSpan = document.createElement("span");
            textSpan.textContent = text;
            textSpan.className = "todo-text";
            if (checked) {
                textSpan.style.textDecoration = "line-through";
            }
        
            // 創建刪除按鈕
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "刪除";
            deleteBtn.className = "delete-btn";
            
            // 將打勾方塊、文字容器、刪除按鈕，新增到列表中
            listItem.appendChild(checkbox);
            listItem.appendChild(textSpan);
            listItem.appendChild(deleteBtn);
        
            // 將列表新增到清單中
            todoList.appendChild(listItem);
        
            // 為打勾方塊增加事件監聽器
            checkbox.addEventListener("change", function(){
                if(this.checked){
                    textSpan.style.textDecoration = "line-through";
                }else{
                    textSpan.style.textDecoration = "none";
                }
                saveTodos(); // 當狀態改變時保存
            });
        
            // 為刪除按鈕增加事件監聽
            deleteBtn.addEventListener("click", function(){
                listItem.remove();
                saveTodos(); // 當刪除項目時保存
            });
        }
        
        function addlist(){
            const todoItem = todoInput.value.trim();
            if(todoItem !== ""){
                createTodoItem(todoItem, false);
                
                // 清除輸入框
                todoInput.value = "";
                
                // 保存到 localStorage
                saveTodos();
            }else{
                alert("不要騙我!你還沒有輸入!!!");
            }
        }
        
        // 全部清除功能
        clearBtn.addEventListener("click", function() {
            // 檢查是否有項目可以清除
            if (todoList.children.length === 0) {
                alert("清單已經是空的!");
                return;
            }
        
            // 儲存當前項目以便復原
            deletedItems = [];
            Array.from(todoList.children).forEach(item => {
                // 創建項目的副本
                const itemClone = {
                    text: item.querySelector(".todo-text").textContent,
                    checked: item.querySelector(".to-do-checkbox").checked
                };
                deletedItems.push(itemClone);
            });
        
            // 清空清單
            todoList.innerHTML = "";
            
            // 保存到 localStorage
            saveTodos();
        });
        
        // 復原功能
        revertBtn.addEventListener("click", function() {
            // 檢查是否有可復原的項目
            if (deletedItems.length === 0) {
                alert("沒有可復原的項目!");
                return;
            }
        
            // 清空當前清單
            todoList.innerHTML = "";
            
            // 復原所有儲存的項目
            deletedItems.forEach(itemData => {
                createTodoItem(itemData.text, itemData.checked);
            });
            
            // 復原後清空刪除的項目列表（只能復原一次）
            deletedItems = [];
            
            // 保存到 localStorage
            saveTodos();
        });
        
        // 點擊新增時呼叫函數
        addBtn.addEventListener("click", addlist);
        
        // 按下enter鍵時呼叫函數
        todoInput.addEventListener("keypress", function(event){
            if (event.key === "Enter") { 
                addlist();
            }
        });
        
        // 頁面載入時，從 localStorage 中載入待辦事項
        document.addEventListener('DOMContentLoaded', loadTodos);


       // 選擇小幫手功能
       var choiceInput = document.getElementById("choice-input");
       var choiceBtn = document.getElementById("choice-btn");
       var choiceRandomBtn = document.getElementById("choice-random-btn");
       var choiceClearBtn = document.getElementById("choice-clear-btn");
       var choiceList = document.getElementById("choice-list");
       var choiceResult = document.getElementById("choice-result");

       //儲存選項的陣列
       var choices = [];

       // 新增選項的共用函式
       function addChoice(){
           var inputText = choiceInput.value.trim();

           if(inputText === ""){
               alert("請輸入內容");
               return;
           }

           // 檢查是否已存在相同選項
           if(choices.includes(inputText)){
               alert("這個選項已經存在了！");
               return;
           }

           choices.push(inputText);
           
           //將選項加入列表
           var li = document.createElement("li");
           li.textContent = inputText;
           li.classList.add("list-item");
           
           //為每一個選項添增刪除按鈕
           var deleteBtn = document.createElement("button");
           deleteBtn.textContent = "刪除";
           deleteBtn.classList.add("delete-btn");
           
           //為刪除按鈕新增點擊事件
           deleteBtn.addEventListener("click", function(){
               var index = choices.indexOf(inputText);
               //在陣列中移除
               if(index > -1){
                   choices.splice(index, 1);
               }
               //從dom元素移除
               li.remove();
               
               // 如果沒有選項了，清空結果
               if(choices.length === 0){
                   choiceResult.innerHTML = "";
               }
           });
           
           li.appendChild(deleteBtn);
           choiceList.appendChild(li);
           
           choiceInput.value = ""; //清空輸入框
       }

       // 點擊按鈕的事件
       choiceBtn.addEventListener("click", function(){
           addChoice();
       });

       // 在輸入框上監聽按鍵事件
       choiceInput.addEventListener("keydown", function(event){
           if(event.key === "Enter"){
               addChoice();
           }
       });

       //為清空選項按鈕添加事件
       choiceClearBtn.addEventListener("click", function(){
           if(choices.length === 0){
               alert("目前沒有選項可以清除");
               return;
           }
           
           if(confirm("確定要清空所有選項嗎？")){
               choices = [];//清空陣列
               choiceList.innerHTML = "";//清空列表
               choiceResult.innerHTML = "";//清空結果
           }
       });

//為隨機選擇添加事件
       choiceRandomBtn.addEventListener("click", function(){
        if(choices.length === 0){
            alert("請先新增一些選項！");
            return;
        }
        
        // 清空結果和重置所有高亮
        choiceResult.innerHTML = "";
        document.querySelectorAll('.list-item').forEach(item => {
            item.classList.remove('slot-highlight', 'final-selected');
        });
        
        // 簡單的跳動效果
        const listItems = document.querySelectorAll('.list-item');
        let currentIndex = 0;
        let count = 0;
        
        const interval = setInterval(() => {
            listItems.forEach(item => item.classList.remove('slot-highlight'));
            listItems[currentIndex].classList.add('slot-highlight');
            currentIndex = (currentIndex + 1) % listItems.length;
            count++;
            
            if(count > 10) {
                clearInterval(interval);
                listItems.forEach(item => item.classList.remove('slot-highlight'));
                
                // 最終結果
                const randomIndex = Math.floor(Math.random() * choices.length);
                const result = choices[randomIndex];
                listItems[randomIndex].classList.add('final-selected');
                
                const p = document.createElement("p");
                p.textContent = "🎯 " + result + " 🎯";
                choiceResult.appendChild(p);
            }
        }, 200);
    });
