# 🚀 GitHub Pages 部署指南

为 wesleyjinwan@gmail.com 账号部署 GlucoBuddy 网站的详细步骤。

## 📋 准备工作

### 1. 确认GitHub账号
- 账号：`wesleyjinwan@gmail.com`
- 确保已登录 [github.com](https://github.com)

### 2. 安装必要工具
- Git（如果还没安装）
- 文本编辑器（VS Code推荐）

## 🏗️ 第一步：创建GitHub仓库

1. **访问GitHub**
   - 打开 [github.com](https://github.com)
   - 登录您的账号

2. **创建新仓库**
   - 点击右上角 "+" → "New repository"
   - **Repository name**: `glucobuddy-website`
   - **Description**: `Marketing website for GlucoBuddy diabetes management app`
   - **Visibility**: Public ✅
   - **Initialize**: ✅ Add a README file
   - 点击 "Create repository"

3. **获取仓库URL**
   - 创建后，复制仓库URL：
   - `https://github.com/jinwan1998/glucobuddy-website.git`

## 📁 第二步：准备本地文件

### 方法1：使用自动部署脚本（推荐）

在您的 `website` 文件夹中：

**Windows用户：**
```cmd
# 双击运行
deploy.bat
```

**Mac/Linux用户：**
```bash
# 在终端中运行
chmod +x deploy.sh
./deploy.sh
```

### 方法2：手动Git命令

```bash
# 进入website目录
cd website

# 初始化Git
git init
git branch -M main

# 添加远程仓库
git remote add origin https://github.com/jinwan1998/glucobuddy-website.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: GlucoBuddy marketing website"

# 推送到GitHub
git push -u origin main
```

## ⚙️ 第三步：配置GitHub Pages

1. **进入仓库设置**
   - 在GitHub仓库页面，点击 "Settings" 标签

2. **找到Pages设置**
   - 在左侧菜单中找到 "Pages"
   - 或直接访问：`https://github.com/jinwan1998/glucobuddy-website/settings/pages`

3. **配置部署源**
   - **Source**: 选择 "GitHub Actions"
   - 这将启用自动部署工作流

4. **保存设置**
   - 设置会自动保存

## 🔄 第四步：验证部署

1. **检查Actions**
   - 点击仓库的 "Actions" 标签
   - 查看部署工作流状态
   - 等待绿色✅表示成功

2. **访问网站**
   - 部署成功后，网站将在以下地址可用：
   - `https://jinwan1998.github.io/glucobuddy-website/`

3. **检查功能**
   - 测试所有页面链接
   - 验证聊天机器人功能
   - 测试反馈表单
   - 检查响应式设计

## 🛠️ 故障排除

### 常见问题1：认证失败
```bash
# 如果推送时要求用户名密码
# 使用Personal Access Token

# 1. 去GitHub Settings → Developer settings → Personal access tokens
# 2. 生成新token，选择 'repo' 权限
# 3. 使用token作为密码
```

### 常见问题2：Pages未启用
- 确保仓库是Public
- 检查Pages设置是否正确
- 等待几分钟让设置生效

### 常见问题3：404错误
- 检查文件路径大小写
- 确保index.html在根目录
- 验证所有链接路径

## 📊 第五步：配置分析和监控

### 1. Google Analytics（可选）
```html
<!-- 在index.html的<head>中添加 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Google Search Console
- 访问 [search.google.com/search-console](https://search.google.com/search-console)
- 添加属性：`https://jinwan1998.github.io/glucobuddy-website/`
- 验证所有权

## 🔄 第六步：更新网站

每次更新网站内容：

```bash
# 修改文件后
git add .
git commit -m "Update website content"
git push origin main

# GitHub Actions会自动重新部署
```

## 🌐 自定义域名（可选）

如果您想使用自定义域名（如 glucobuddy.com）：

1. **购买域名**
   - 推荐：Namecheap, Google Domains

2. **配置DNS**
   ```
   Type: CNAME
   Name: www
   Value: jinwan1998.github.io

   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

3. **添加CNAME文件**
   ```bash
   # 在仓库根目录创建CNAME文件
   echo "www.glucobuddy.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push origin main
   ```

## ✅ 部署检查清单

- [ ] GitHub仓库已创建
- [ ] 所有文件已上传
- [ ] GitHub Pages已启用
- [ ] Actions工作流运行成功
- [ ] 网站可以访问
- [ ] 所有功能正常工作
- [ ] 响应式设计正常
- [ ] SEO设置完成
- [ ] 分析工具配置（可选）

## 📞 获取帮助

如果遇到问题：

1. **检查GitHub Actions日志**
   - 在Actions标签查看详细错误信息

2. **常见解决方案**
   - 清除浏览器缓存
   - 等待DNS传播（最多24小时）
   - 检查文件权限

3. **联系支持**
   - GitHub Support: [support.github.com](https://support.github.com)
   - 社区论坛: [github.community](https://github.community)

## 🎉 恭喜！

您的GlucoBuddy营销网站现在已经成功部署到GitHub Pages！

**网站地址**: `https://jinwan1998.github.io/glucobuddy-website/`

现在您可以：
- 分享网站链接
- 在社交媒体推广
- 收集用户反馈
- 监控网站性能
- 持续更新内容

---

🚀 **下一步**: 开始推广您的GlucoBuddy应用，让更多糖尿病患者受益！
