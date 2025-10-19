// 切换内容类型
document.querySelectorAll('.content-type-btn').forEach(button => {
    button.addEventListener('click', function() {
        // 更新按钮状态
        document.querySelectorAll('.content-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        
        // 显示对应的表单
        const type = this.getAttribute('data-type');
        document.querySelectorAll('.content-form').forEach(form => {
            form.classList.add('hidden');
        });
        document.getElementById(`${type}-form`).classList.remove('hidden');
        
        // 重置预览区域
        resetPreview();
    });
});

// 生成内容
document.getElementById('generate-btn').addEventListener('click', function() {
    const activeType = document.querySelector('.content-type-btn.active').getAttribute('data-type');
    
    // 显示加载状态
    const generateBtn = document.getElementById('generate-btn');
    const originalContent = generateBtn.innerHTML;
    generateBtn.innerHTML = '<i class="btn-icon">⏳</i><span>生成中...</span>';
    generateBtn.classList.add('loading');
    generateBtn.disabled = true;
    
    // 模拟生成过程
    setTimeout(() => {
        generateContent(activeType);
        generateBtn.innerHTML = originalContent;
        generateBtn.classList.remove('loading');
        generateBtn.disabled = false;
    }, 2000);
});

// 下载内容
document.getElementById('download-btn').addEventListener('click', function() {
    const activeType = document.querySelector('.content-type-btn.active').getAttribute('data-type');
    downloadContent(activeType);
});

// 生成内容函数
function generateContent(type) {
    resetPreview();
    
    // 隐藏预览占位符
    document.getElementById('preview-placeholder').style.display = 'none';
    
    switch(type) {
        case 'copywriting':
            generateCopywriting();
            break;
        case 'image':
            generateImage();
            break;
        case 'video':
            generateVideo();
            break;
    }
}

// 生成文案
function generateCopywriting() {
    const copyType = document.getElementById('copy-type').value;
    const tone = document.getElementById('tone').value;
    const length = document.getElementById('length').value;
    const keywords = document.getElementById('keywords').value;
    const additionalInfo = document.getElementById('additional-info').value;
    
    // 根据选择生成示例文案
    let text = '';
    let title = '';
    
    // 根据文案类型设置标题
    const typeTitles = {
        'social-media': '社交媒体文案',
        'ad': '广告文案',
        'product': '产品描述',
        'email': '电子邮件营销',
        'blog': '博客文章'
    };
    
    title = typeTitles[copyType] || '文案内容';
    
    if (copyType === 'social-media') {
        text = `🔥 热门话题！${keywords ? `与 ${keywords} 相关` : ''}的精彩内容来啦！\n\n`;
        
        if (tone === 'humorous') {
            text += `笑死！这个${keywords ? keywords.split(',')[0] : ''}也太有趣了吧！🤣\n`;
            text += `大家快来看看，我已经笑到停不下来了！\n`;
            if (additionalInfo) text += `特别提示：${additionalInfo}\n`;
        } else if (tone === 'inspirational') {
            text += `每一天都是新的开始，让我们一起探索${keywords ? keywords.split(',')[0] : '生活'}的美好！✨\n`;
            text += `保持积极，追逐梦想，你就是最棒的！\n`;
            if (additionalInfo) text += `感悟：${additionalInfo}\n`;
        } else if (tone === 'professional') {
            text += `我们很高兴与您分享${keywords ? `关于 ${keywords}` : '这个'}重要内容。\n`;
            text += `作为行业领导者，我们致力于提供最优质的信息和服务。\n`;
            if (additionalInfo) text += `详情：${additionalInfo}\n`;
        } else {
            text += `分享${keywords ? `关于 ${keywords}` : '一个'}精彩内容！\n`;
            text += `不要错过这个绝佳的机会，快来了解详情吧！\n`;
            if (additionalInfo) text += `更多信息：${additionalInfo}\n`;
        }
        
        text += `\n#热门话题 #分享`;
        if (keywords) {
            keywords.split(',').forEach(keyword => {
                text += ` #${keyword.trim()}`;
            });
        }
    } else if (copyType === 'ad') {
        text = `【特别推荐】${keywords ? keywords.split(',')[0] : '优质产品'}，限时优惠！\n\n`;
        
        if (tone === 'urgent') {
            text += `⚠️ 仅剩最后机会！错过今天，再等一年！\n`;
            text += `立即行动，享受超值优惠！\n`;
            if (additionalInfo) text += `特别提醒：${additionalInfo}\n`;
        } else if (tone === 'professional') {
            text += `我们致力于为您提供最高品质的${keywords ? keywords.split(',')[0] : '产品'}。\n`;
            text += `经过严格测试与验证，确保您的完全满意。\n`;
            if (additionalInfo) text += `产品特点：${additionalInfo}\n`;
        } else if (tone === 'humorous') {
            text += `哈哈，这个${keywords ? keywords.split(',')[0] : '产品'}太棒了！\n`;
            text += `用了它，生活变得更加轻松有趣！😄\n`;
            if (additionalInfo) text += `有趣的事实：${additionalInfo}\n`;
        } else {
            text += `您是否正在寻找${keywords ? keywords.split(',')[0] : '理想'}的解决方案？\n`;
            text += `我们的产品正是您需要的完美选择！\n`;
            if (additionalInfo) text += `优势：${additionalInfo}\n`;
        }
        
        text += `\n立即点击了解详情 →`;
    } else if (copyType === 'product') {
        const productName = keywords ? keywords.split(',')[0] : '创新产品';
        text = `产品名称：${productName}\n\n`;
        text += `产品描述：\n`;
        
        if (tone === 'professional') {
            text += `这款${productName}采用先进技术，专为满足现代需求而设计。\n`;
            text += `具有卓越的性能和可靠的品质，是您的不二之选。\n`;
            if (additionalInfo) text += `技术规格：${additionalInfo}\n`;
        } else if (tone === 'casual') {
            text += `超好用的${productName}来啦！\n`;
            text += `简单易用，效果出众，用过的人都说好！\n`;
            if (additionalInfo) text += `用户评价：${additionalInfo}\n`;
        } else if (tone === 'inspirational') {
            text += `让${productName}点亮您的生活！\n`;
            text += `它不仅是一件产品，更是实现梦想的工具。\n`;
            if (additionalInfo) text += `灵感来源：${additionalInfo}\n`;
        } else {
            text += `探索这款${productName}的独特魅力！\n`;
            text += `它将为您的生活带来前所未有的便利与乐趣。\n`;
            if (additionalInfo) text += `特色功能：${additionalInfo}\n`;
        }
        
        text += `\n主要特点：\n`;
        text += `• 高效性能\n`;
        text += `• 用户友好设计\n`;
        text += `• 卓越品质保证\n`;
        if (keywords && keywords.split(',').length > 1) {
            keywords.split(',').slice(1).forEach((feature, index) => {
                if (index < 3) text += `• ${feature.trim()}\n`;
            });
        }
    } else if (copyType === 'email') {
        text = `主题：${keywords ? `关于${keywords.split(',')[0]}` : '重要通知'}\n\n`;
        text += `尊敬的客户，\n\n`;
        
        if (tone === 'professional') {
            text += `我们写信是为了与您分享${keywords ? `关于${keywords}` : '一个重要更新'}。\n`;
            text += `我们一直致力于为您提供最优质的服务和体验。\n`;
        } else if (tone === 'casual') {
            text += `嗨！想和您分享${keywords ? `关于${keywords}` : '一个好消息'}！\n`;
            text += `我们觉得您会对此感兴趣。\n`;
        } else if (tone === 'urgent') {
            text += `重要通知！${keywords ? `关于${keywords}` : '请立即查看'}！\n`;
            text += `这个机会有限，请尽快采取行动。\n`;
        }
        
        if (additionalInfo) text += `\n${additionalInfo}\n`;
        
        text += `\n感谢您的关注！\n`;
        text += `祝好，\n`;
        text += `[您的团队]`;
    } else if (copyType === 'blog') {
        const blogTopic = keywords ? keywords.split(',')[0] : '有趣话题';
        text = `# ${blogTopic}\n\n`;
        
        if (tone === 'professional') {
            text += `在当今快速发展的世界中，${blogTopic}已成为一个重要议题。\n\n`;
            text += `本文将深入探讨${blogTopic}的各个方面，分析其影响和发展趋势。\n`;
        } else if (tone === 'casual') {
            text += `今天我们来聊聊${blogTopic}，这个话题真的很有意思！\n\n`;
            text += `我发现${blogTopic}其实比我们想象的更加贴近生活。\n`;
        } else if (tone === 'inspirational') {
            text += `你是否曾思考过${blogTopic}的真正意义？\n\n`;
            text += `让我们一起探索${blogTopic}如何能够改变我们的视角和生活。\n`;
        }
        
        if (additionalInfo) text += `\n${additionalInfo}\n`;
        
        text += `\n## 主要观点\n`;
        text += `1. 第一点重要内容\n`;
        text += `2. 第二点深入分析\n`;
        text += `3. 第三点实用建议\n`;
        
        text += `\n## 总结\n`;
        text += `${blogTopic}是一个值得我们深入探讨的话题。`;
        if (keywords && keywords.split(',').length > 1) {
            text += `通过了解${keywords.split(',')[1]}，我们可以更好地理解这一领域。`;
        }
    }
    
    // 根据长度调整文案
    if (length === 'short') {
        // 缩短文案
        const sentences = text.split('\n');
        text = sentences.slice(0, 6).join('\n');
        if (sentences.length > 6) text += '\n...';
    } else if (length === 'long') {
        // 扩展文案
        if (copyType === 'blog') {
            text += `\n\n## 详细分析\n`;
            text += `要进一步理解${keywords ? keywords.split(',')[0] : '这个主题'}，我们需要从多个角度进行探讨。首先，历史背景为我们提供了重要的上下文。其次，当前的发展趋势展示了这一领域的动态变化。最后，未来的可能性激发了我们的想象力。\n\n`;
            text += `无论您是专业人士还是对此感兴趣的初学者，本文都希望能为您提供有价值的信息和见解。我们鼓励您继续探索这一迷人领域，并分享您的想法和经验。`;
        } else {
            text += `\n\n更多详细信息：\n`;
            text += `我们的${keywords ? keywords.split(',')[0] : '产品'}经过精心设计和严格测试，确保满足您的各种需求。`;
            text += `无论您是初次使用还是经验丰富的用户，都能轻松上手并获得卓越体验。`;
            text += `我们致力于提供优质的客户服务，确保您在使用的每一个环节都能感受到我们的用心。`;
        }
    }
    
    document.getElementById('copywriting-text').textContent = text;
    document.getElementById('preview-copywriting').style.display = 'block';
}

// 生成图像
function generateImage() {
    const imageType = document.getElementById('image-type').value;
    const style = document.getElementById('image-style').value;
    const colorScheme = document.getElementById('color-scheme').value;
    const subject = document.getElementById('image-subject').value || '示例图像';
    const details = document.getElementById('image-details').value;
    
    // 使用占位图像服务，模拟不同风格的图像
    const width = 600;
    const height = 400;
    
    // 根据选择生成不同的图像ID，模拟不同风格的图像
    let imageId = Math.floor(Math.random() * 1000);
    
    // 根据图像类型调整ID范围，模拟不同类型的图像
    const typeModifiers = {
        'photo': 0,
        'illustration': 1000,
        'abstract': 2000,
        'minimalist': 3000,
        '3d': 4000
    };
    
    imageId += typeModifiers[imageType] || 0;
    
    const imageUrl = `https://picsum.photos/seed/${imageId}/${width}/${height}`;
    
    // 在实际应用中，这里会调用AI图像生成API
    document.getElementById('image-preview').src = imageUrl;
    document.getElementById('image-preview').alt = `生成的${subject}图像 - ${style}风格，${colorScheme}色彩`;
    document.getElementById('preview-image').style.display = 'block';
    
    // 添加图像描述
    const imageDesc = document.createElement('p');
    imageDesc.className = 'image-description';
    imageDesc.textContent = `图像描述: ${subject}${details ? ` - ${details}` : ''} (${style}风格, ${colorScheme}色彩)`;
    imageDesc.style.marginTop = '15px';
    imageDesc.style.textAlign = 'center';
    imageDesc.style.color = 'var(--gray)';
    
    const container = document.querySelector('.image-container');
    // 移除之前的描述（如果有）
    const existingDesc = container.querySelector('.image-description');
    if (existingDesc) {
        existingDesc.remove();
    }
    container.appendChild(imageDesc);
}

// 生成视频
function generateVideo() {
    const videoType = document.getElementById('video-type').value;
    const length = document.getElementById('video-length').value;
    const style = document.getElementById('video-style').value;
    const topic = document.getElementById('video-topic').value || '示例视频';
    const script = document.getElementById('video-script').value;
    
    // 根据视频长度选择不同的示例视频
    let videoUrl = '';
    if (length === 'short') {
        videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
    } else if (length === 'medium') {
        videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4';
    } else {
        videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    }
    
    // 在实际应用中，这里会调用AI视频生成API
    const videoElement = document.getElementById('video-preview');
    videoElement.src = videoUrl;
    document.getElementById('preview-video').style.display = 'block';
    
    // 添加视频描述
    const videoDesc = document.createElement('p');
    videoDesc.className = 'video-description';
    videoDesc.textContent = `视频主题: ${topic} - ${videoType} (${style}风格, ${length}长度)`;
    videoDesc.style.marginTop = '15px';
    videoDesc.style.textAlign = 'center';
    videoDesc.style.color = 'var(--gray)';
    
    const container = document.querySelector('.video-container');
    // 移除之前的描述（如果有）
    const existingDesc = container.querySelector('.video-description');
    if (existingDesc) {
        existingDesc.remove();
    }
    container.appendChild(videoDesc);
}

// 下载内容
function downloadContent(type) {
    switch(type) {
        case 'copywriting':
            // 创建文本文件并下载
            const text = document.getElementById('copywriting-text').textContent;
            const blob = new Blob([text], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = '生成的文案.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            break;
        case 'image':
            // 在实际应用中，这里会下载生成的图像
            alert('图像下载功能需要后端支持，当前为演示版本');
            break;
        case 'video':
            // 在实际应用中，这里会下载生成的视频
            alert('视频下载功能需要后端支持，当前为演示版本');
            break;
    }
}

// 重置预览区域
function resetPreview() {
    document.getElementById('preview-placeholder').style.display = 'flex';
    document.querySelectorAll('.preview-content').forEach(preview => {
        preview.style.display = 'none';
    });
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 设置默认表单
    document.getElementById('copywriting-form').classList.remove('hidden');
    
    // 为所有表单元素添加轻微动画
    document.querySelectorAll('select, input, textarea').forEach(element => {
        element.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
});