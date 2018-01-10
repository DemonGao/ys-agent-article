const express = require('express')
const router = express.Router()
const Mock = require('mockjs')
const Random = Mock.Random

let ResultMap = {
    code: 'SUCCESS',
    msg: '成功',
    body: null
}
/***
 * 根据type获取文章数据
 */
router.post('/agent/article/services/loadArticlelistByclickType', (req, res) => {
    const mockData = Mock.mock({
        'list|9': [
            {
                id: 'AO-3RAw69FjIuD9Wo7AGfl',
                imgSrc: '@image(200x100, @hex())',
                title: '@cword(3, 5)',
                publishtime: '@datatime()',
                introduce: '@cparagraph(1)',
                videoImg: '@image(200x100, @hex())',
                'commentcount|1-100': 1000,
                'thumbsupcount|1-100': 1000,
                'readcount|1-100': 1000
            }
        ],
        pageCount: 2,
        pageNo: 0,
        pageSize: 9,
        totalCount: 18
    })
    ResultMap.body = mockData
    res.json(ResultMap)
})
module.exports = router
