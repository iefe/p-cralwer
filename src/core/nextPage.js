/**
 * @param {*} page puppeteer page对象
 * @param {*} lastScroll 初试滚动Y轴的位置
 */
module.exports = async function autoScroll(page, lastScroll = 0) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      try {
        const maxScroll = Number.MAX_SAFE_INTEGER
        const interval = setInterval(() => {
          window.scrollBy(0, 100);
          const scrollTop = document.documentElement.scrollTop
          if (scrollTop === maxScroll || lastScroll === scrollTop) {
            clearInterval(interval)
            resolve()
          } else {
            lastScroll = scrollTop
          }
        }, 100)
      } catch (err) {
        console.log(err)
        reject(err.toString())
      }
    })
  })
}