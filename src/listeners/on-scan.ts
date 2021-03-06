/**
 *   Wechaty - https://github.com/chatie/wechaty
 *
 *   @copyright 2016-2018 Huan LI <zixia@zixia.net>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
import { log } from 'wechaty'
import { Mail } from '../service/mail-service'
import { moment } from '../service/helpers-service'

async function onScan (qrcode, status) {
  require('qrcode-terminal').generate(qrcode, { small: true })

  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode)
  ].join('')

  if (qrcode && moment(moment().format('YYYY-MM-DD HH:mm:ss')).isBetween(moment().format('YYYY-MM-DD') + ' 08:00:00', moment().format('YYYY-MM-DD') + ' 23:00:00')) {
    (new Mail()).send('中英互译小助手登录二维码', `<img src="${qrcodeImageUrl}" width="200px" />`, true)
  }

  log.info(status, qrcodeImageUrl)
}

module.exports = onScan
