import './footer.scss';
import { useEffect } from "react";

export const Footer = () => {
    useEffect(() => {
        // 此处可以添加针对底部组件的其他初始化逻辑
    }, []);

    return (
        <footer className="footer">
            {/* Based on TON 链接 */}
            <a href="https://ton.org" target="_blank" rel="noopener noreferrer" className="ton-link">
                <img src="/ton_symbol.svg" alt="TON Symbol" />
                Based on TON
            </a>

            <div className="links-right">
                {/* GitHub链接 */}
                <a href="https://github.com/Liomlong/dnswallet" target="_blank" rel="noopener noreferrer">
                    <img src="/path-to-github-icon.svg" alt="GitHub" />
                </a>

        

                {/* Telegram Channel链接 */}
                <a href="https://t.me/pigdns" target="_blank" rel="noopener noreferrer">
                    <img src="/path-to-telegram-icon.svg" alt="Telegram Channel" />
                </a>
            </div>
        </footer>
    )
}
