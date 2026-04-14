![截圖 1](https://github.com/copperhuh/PathDemon/blob/master/screenshots/screenshot-1.png?raw=true)

# PATH DEMON - 迷宮生成與路徑尋找演算法視覺化工具

一款響應式的迷宮生成與路徑尋找演算法視覺化工具，支援自訂延遲時間與網格大小，旨在讓使用者能以直觀且視覺上有趣的方式理解相關演算法。

## 示範

[Github Pages](https://copperhuh.github.io/PathDemon/)

![截圖 2](https://github.com/copperhuh/PathDemon/blob/master/screenshots/screenshot-2.png?raw=true)

## 目錄

-   [使用技術](#使用技術)
-   [本地執行](#本地執行)
-   [運作原理](#運作原理)
-   [靈感來源](#靈感來源)
-   [附錄](#附錄)
-   [作者](#作者)
-   [意見回饋](#意見回饋)

## 使用技術

#### 主要

-   **React**
-   **Redux**（搭配 react-redux）
-   **Styled Components**

#### 其他

-   **use-gesture**（使網格格子具備互動性）
-   **Material UI**（圖示、滑桿元件、下拉選單元件）
-   **Framer Motion**（響應式側欄與彈出視窗的動畫）
-   **Create React App**（初始專案範本）
-   **Github Pages**（示範頁面託管）

## 本地執行

複製專案

```bash
  git clone https://github.com/copperhuh/PathDemon
```

進入專案目錄

```bash
  cd PathDemon
```

安裝相依套件

```bash
  npm install
```

啟動開發伺服器

```bash
  npm start
```

## 運作原理

### 演算法步驟視覺化

簡單來說，每個演算法都以一個生成器（generator）實作，並在執行過程中直接修改原始網格陣列。每當網格發生需要反映在畫面上的重要變化時（例如牆壁節點轉換為通道節點），生成器便會 `yield` 出修改後的網格。整個生成器由一個非同步函式驅動，每次從生成器取得新值前，會先等待由延遲滑桿所設定的毫秒數。

此流程的詳細說明已包含在我[上一個專案](https://github.com/copperhuh/SortDemon)的 README 中，有興趣的話歡迎參閱。

### 可調整大小的網格

容納網格的容器會撐滿整個頁面寬度。為計算網格所需的確切欄數與列數，我們透過 `useRef` 鉤子取得容器的像素寬高，再分別除以尺寸滑桿的當前數值（代表每個網格格子的邊長像素數），即可得到對應的欄數與列數。每次視窗大小改變或尺寸參數變動時，都會重新計算這些數值。

### use-gesture 的使用方式

use-gesture 的 `useDrag` 鉤子用於讓個別網格格子在點擊時能在通道與牆壁之間切換，若點擊的是起點或終點格子，則可進行拖曳移動。選擇 `useDrag` 而非瀏覽器內建的 `click` 或 `mouseover` 事件，主要原因在於瀏覽器檢查這些事件的頻率固定，約每隔數毫秒一次。若快速移動游標經過多個格子，大多數格子的 `mouseover` 事件會因游標在瀏覽器「檢查」間隔中掃過而未被觸發，導致互動體驗明顯遲滯。

相對地，使用 `useDrag` 鉤子，即便是最微小的滑鼠移動也能觸發回呼函式並帶入最新的游標座標。具體做法是：在拖曳事件開始時，記錄最初點擊的格子是通道還是牆壁，並將此資訊保存在 state 中直到事件結束。之後每次滑鼠移動時，利用最新的游標座標計算出當前所在的格子索引，再根據初始格子的狀態將其切換為牆壁或通道。起點與終點格子的拖曳行為亦以類似方式處理（詳見 `hooks` 目錄中 `useAlgo` 的 `bind` 與 `bindSpecial` 函式）。

## 靈感來源

-   [Pathfinding Visualizer](https://clementmihailescu.github.io/Pathfinding-Visualizer/)

此網站是本專案的主要靈感來源，許多功能構想也源自於此。我的主要目標是在其基礎上加以擴充：使網格可調整大小且具備響應式設計、支援在視覺化執行中途更改速度、使手動建立牆壁更加流暢，並加入迷宮生成演算法。

此外特別說明，本專案並非基於任何教學影片製作（我知道原站作者有錄製教學，但我選擇不觀看），因此所有程式碼與問題解法均為原創，功勞應歸於我自己。我這樣說，是不希望任何人認為我只是照抄他人的程式碼——雖然專案的創意並非完全原創，但這確實是我個人對此主題的誠實詮釋。

## 附錄

已知問題：開啟開發者工具時，網格有時不會自動重新調整大小；若發生此情形，只需微調尺寸滑桿即可解決。

若想讓網格更大且願意承受效能下降，可將頁面縮放比例調小，再調整尺寸滑桿或重新整理頁面。若這樣操作，建議在開始視覺化後立即按下「跳過」按鈕。

迷宮演算法說明文字來源：[Wikipedia](https://en.wikipedia.org/wiki/Maze_generation_algorithm)

路徑演算法說明文字來源：[Medium](https://medium.com/omarelgabrys-blog/path-finding-algorithms-f65a8902eb40)

## 作者

-   [Jakub Koper](https://github.com/copperhuh)

## 意見回饋

如有任何意見或建議，歡迎透過以下信箱與我聯繫：jakub.koper@wpc-huh.com
