// 这只是一个示例，
// 您可以安全地删除下面的所有默认属性

export default {
  failed: '操作失败',
  success: '操作成功',
  welcome: '欢迎使用 A Compás 应用',
  notFound: {
    header: '抱歉，此页面不存在。',
    btn: '返回节拍型'
  },
  donate: '捐赠',
  help: '帮助',
  tuning: '调音器',
  shortcuts: '快捷键',
  privacy: '隐私政策',
  android: '获取Android应用',
  follow: '关注我们',
  share: '分享',
  source: '源代码',
  issues: '问题',
  doc: {
    welcome: {
      title: '欢迎使用 A Compás 应用',
      content: `
此应用旨在帮助您学习和练习乐器。
这是一个正在进行的项目，请耐心等待我们继续改进。
如果您有任何问题或建议，请联系我们。`
    },
    getStarted: {
      title: '开始使用',
      content: `
- 从列表中选择一个**节拍型**。节拍型（在弗拉门戈中也称为"palo"）是一种节奏风格。
- 调整节拍型的**节拍**（速度）。
- 在混音器中选择**乐器**。
- **启动**节拍器。`
    },
    options: {
      title: '选项列表',
      content: {
        theme: {
          title: '主题',
          content: `
您可以在浅色和深色主题之间选择。
深色主题更适合昏暗环境，而浅色主题更适合明亮环境。`,
        },
        lang: {
          title: '语言',
          content: `
选择应用界面的语言。
更改会立即应用于所有文本。
您的选择会本地存储（浏览器 / 设备），下次打开应用时仍会保留。`,
        },
        tempo: {
          title: '节拍',
          content: `
有2种方式定义节拍：旋钮圆圈，您可以使用+和-按钮增减bpm。
您还可以直接在输入字段中输入节拍，使用鼠标滚轮，或上下箭头键。
节拍是节拍器的速度，以每分钟节拍数测量。`,
        },
        mixer: {
          title: '乐器混音器',
          content: `
选择播放乐器（确保至少有一个活跃乐器），
设置其相对音量，以及是否播放四分音符或八分音符。`,
        },
        improvise: {
          title: '即兴演奏',
          content: `
如果开启，节拍器有时会停止遵循预编程模式，为一个或多个乐器播放随机节拍。
这在模式中产生"惊喜"。`,
        },
        humanize: {
          title: '人性化',
          content: '如果开启，节拍器将用少量随机偏差播放节拍，模拟人的触感。',
        },
        swing: {
          title: '摇摆',
          content: '如果值为0，八分音符正好是四分音符的一半。当接近1时，应用延迟，产生"爵士风格"的节奏感。',
        },
        reverb: {
          title: '混响',
          content: '调整声音的混响。它模拟房间或大厅效果。',
        },
        startBeat: {
          title: '起始拍',
          content: `
更改起始拍（选定的模式开始的拍子）。
如果您想在不同的拍子上开始模式，这很有用。
例如，如果您想在模式的第2拍开始，将起始拍设置为2。
如果您想练习模式的特定部分，起始拍也很有用。
起始拍和模式开始之间的音符将作为点击声播放。`,
        },
        viewMode: {
          title: '查看模式',
          content: '在点、计数器和时钟可视化之间选择。',
        },
        reset: {
          title: '重置',
          content: '将节拍器设置重置为默认值。您可以重置所有设置或重置当前模式的设置。',
        }
      }
    },
    appSettings: {
      title: '应用程序设置',
      content: {
        theme: {
          title: '主题模式',
          content: `
**浅色和深色主题选项**

A Compás提供浅色和深色主题以提供最佳视觉体验：

- **浅色主题**：适合明亮环境的清洁明亮界面。采用白色背景和深色文字，在日光下具有最大可读性。
- **深色主题**：采用深色背景和浅色文字，对眼睛友好。适合弱光条件，减少长时间练习时的眼部疲劳，并在OLED屏幕上节省电池。

**如何更改：**
- 使用左侧导航菜单中的主题切换按钮
- 更改立即应用于整个应用程序
- 您的偏好会自动保存并在应用重启时恢复`
        },
        language: {
          title: '语言选择',
          content: `
**多语言支持**

A Compás提供9种语言服务全球弗拉门戈社区：

- **英语** (en-US) - 默认语言
- **法语** (Français) - 完整翻译
- **西班牙语** (Español) - 原生弗拉门戈术语
- **德语** (Deutsch) - 完整本地化
- **意大利语** (Italiano) - 完整界面翻译
- **日语** (日本語) - 亚洲市场支持
- **中文** (中文) - 简体中文
- **阿拉伯语** (العربية) - 从右到左支持
- **波斯语** (فارسی) - 波斯语本地化

**如何更改语言：**
使用左侧导航菜单中的语言选择器在可用语言之间切换。`
        },
        visualization: {
          title: '可视化模式',
          content: `
**节拍可视化的三种显示选项**

选择最适合您练习风格的可视化：

**1. 点模式**
- 带有动画点的简洁极简显示
- 每个点代表模式中的一个节拍
- 活跃节拍用颜色和动画突出显示

**2. 计数器模式**
- 显示当前位置的数字节拍计数器
- 显示当前节拍号和模式中的总节拍数
- 通过节拍的清晰数字进展

**3. 时钟模式**
- 圆形时钟面可视化
- 节拍围绕带有动画指针的时钟排列
- 提供循环节奏的直观感受`
        }
      }
    },
    utils: {
      wikipediaUrl: '维基百科文章：',
      videoExample: '视频示例：',
      openLink: '打开链接',
      source: '来源：维基百科',
      beats: '{count} 拍',
      disabled: '此选项对此模式已禁用。'
    },
    searchPattern: {
      title: '搜索模式',
      content: `
许多弗拉门戈**palos**实际上来源于其他节奏结构。
例如，"farruca"来源于"tientos"，"columbiana"或"garrotín"是"tangos"的类型。
在这里您可以输入您听过的任何"palo"名称，A Compás将搜索它所来源的模式。
- 通过输入名称或其一部分搜索模式。
- 搜索不区分大小写。
- 搜索在模式名称和链接模式上执行。
- 搜索在整个字符串上执行，不是在单词上。`
    },
    shortcuts: {
      title: '以下快捷键可用于键盘操作：',
      space: '播放/停止节拍器',
      up: '增加节拍（按住键更快增加）',
      down: '减少节拍（按住键更快减少）',
      left: '上一个模式',
      right: '下一个模式',
      esc: '关闭模态窗口',
      tab: '更改焦点按钮'
    },
    reset: {
      title: '恢复默认参数',
      warning: '警告！这将删除您的节拍器设置。',
      close: '关闭',
      proceed: '继续',
      success: '成功！您的节拍器设置已重置。',
    },
    context: {
      title: '选择上下文',
    },
    reverb: {
      title: '混响衰减',
      content: '为声音混响设置衰减'
    },
    swing: {
      title: '摇摆',
      content: '为节拍器设置摇摆值',
      caption: '如果值为0，八分音符正好是四分音符的一半。当接近1时，应用延迟，产生"爵士风格"的节奏味道。'
    },
    startBeat: {
      title: '起始拍',
      content: '设置节拍器开始播放的拍子'
    },
    mixer: {
      title: '乐器混音器',
      content: '选择您要播放的乐器',
      active: {
        title: '活跃',
        content: '播放此乐器'
      },
      shown: {
        title: '显示',
        content: '在可视化中显示此乐器'
      },
      eighth: {
        title: '8分',
        content: '切换八分音符'
      },
      volume: {
        title: '音量 (db)',
        content: '增加或减少乐器音量'
      }
    },
    pattern: {
      title: '选择模式',
      search: '搜索模式',
      searchSm: '搜索',
    },
    prestart: {
      title: '从拍子预启动',
      content: '可选择定义一个拍子，从该拍子开始预计数点击，然后实际循环开始。'
    },
    privacy: {
      title: '隐私政策',
      content: `
此应用使用名为**Matomo**的工具收集匿名访问分析数据。

如果您激活下面的选项，Matomo将在网络浏览器中设置cookie（对于acompas.org网站），
或在移动设备中（对于Android应用），
并观察您在应用中的一些操作
（主要是节拍器的"播放"和"停止"操作以推断播放时间），
匿名化您的IP地址。

此信息仅是我们使用统计的一部分（了解我们有多少用户）。我们不出售也不向任何其他人提供此数据的访问权限。
您可以随时启用或禁用此功能。`,
      allow: `
我们不收集任何记名个人数据。

**允许此应用向我们发送一些匿名使用数据吗？**`,
      enable: '启用并关闭',
      close: '关闭',
    },
    tempo: {
      title: '节拍',
      content: '设置节拍器的节拍',
      bpm: 'BPM'
    },
    update: {
      title: '应用初始化',
      content: `
应用的设置需要（重新）初始化。

如果您使用过此应用的旧版本，您将丢失所有设置和模式。
但这是获得新功能的唯一方法。如果这是您的首次使用，这不会改变任何东西，请继续。`,
      button: '重新加载应用'
    },
    tuning: {
      title: '调音器',
      content: '播放调音器声音',
      caption: '全部',
      play: '播放',
      stop: '停止'
    },
    changelog: {
      title: 'Changelog',
      description: 'Latest changes and updates to A Compás',
    }
  },
  buttons: {
    context : '选择上下文',
    pattern: '模式',
    restore: '恢复设置',
    options: '节奏选项',
    settings: '应用设置'
  },
  notify: {
    loading: '加载中…',
    audioInit: '正在初始化音频…',
    loadSamplesFailed: '加载音频样本失败！',
    startSequencesFailed: '启动音频序列失败。请重试。',
    fetchDataError: '获取数据时出错',
    oneInstrumentRequired: '必须至少选择一种乐器！',
    tempo: {
      verySlow: '你的速度非常慢',
      veryFast: '你的速度非常快',
      rhythmVerySlow: '你的节奏非常慢',
      porTientos: '你的速度是 por tientos',
      verySlowTientos: '你的速度非常慢，即使对 tientos 来说也是',
      tangosRumbas: '你的速度更像 tangos 或 rumbas',
      porBuleria: '你的速度是 por bulería',
      porRumba: '你的速度是 por rumba',
      soleaBuleriaAlegria: '你的速度是 soleá por bulería 或 alegría'
    },
    browserUnsupported: {
      title: '请更新您的浏览器！',
      message: '您的浏览器不支持本应用使用的一项或多项技术。请使用其他浏览器或其他版本重新访问。'
    }
  },
  sync: {
    title: '音画延迟',
    caption: '移动动画使其与声音同步。如果点击声在动画之后才听到，请增大该值——通常发生在使用蓝牙耳机时。'
  }
}
