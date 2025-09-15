import { useEffect } from 'react';
import GameView from './views/GameView';
import { I18nProvider } from './i18n/I18nContext';
import LanguageSelector from './components/LanguageSelector';
import './App.css';

function App() {
  // 设置游戏板尺寸，15列和20行
  const BOARD_WIDTH = 15;
  const BOARD_HEIGHT = 20;

  // 全局动画效果
  useEffect(() => {
    // 添加页面载入动画类
    document.body.classList.add('page-loaded');

    // 清理函数
    return () => {
      document.body.classList.remove('page-loaded');
    };
  }, []);

  return (
    <I18nProvider>
      <div className="app-container">
        <LanguageSelector />
        <GameView width={BOARD_WIDTH} height={BOARD_HEIGHT} />
      </div>
    </I18nProvider>
  );
}

export default App;
