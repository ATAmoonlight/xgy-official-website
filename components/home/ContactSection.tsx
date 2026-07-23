import Image from "next/image";
import { getContactInfo } from "@/lib/company-content";
import HomeSectionHeading from "./HomeSectionHeading";
import styles from "./ContactSection.module.css";

export default async function ContactSection() {
  const contact = await getContactInfo();

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-section-title"
    >
      <div className={styles.inner}>
        <HomeSectionHeading
          eyebrow="联系我们"
          title="欢迎咨询设备方案"
          titleId="contact-section-title"
          description="欢迎联系我们了解设备配置、适用物料及定制需求。"
          className={styles.heading}
        />

        <div className={styles.layout}>
          <div className={styles.mapPanel} aria-label="制造基地地图位置">
            <div className={styles.mapGrid} aria-hidden="true" />
            <div className={styles.mapContent}>
              <span className={styles.mapEyebrow}>制造基地位置</span>
              <span className={styles.mapMarker} aria-hidden="true" />
              <h3>东莞制造基地</h3>
              <address>{contact.address}</address>
              <p className={styles.mapNote}>腾讯地图接入位置</p>
            </div>
          </div>

          <div className={styles.contactPanel}>
            <div className={styles.companyNames}>
              {contact.companyNames.map((name) => (
                <p key={name}>{name}</p>
              ))}
            </div>

            <dl className={styles.contactList}>
              <div>
                <dt>联系电话</dt>
                <dd>
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </dd>
              </div>
              <div>
                <dt>联系邮箱</dt>
                <dd>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </dd>
              </div>
              <div>
                <dt>公司地址</dt>
                <dd>{contact.address}</dd>
              </div>
              {contact.workTime ? (
                <div>
                  <dt>工作时间</dt>
                  <dd>{contact.workTime}</dd>
                </div>
              ) : null}
            </dl>

            <div className={styles.contactActions}>
              <a href={`tel:${contact.phone}`} className={styles.primaryButton}>
                立即咨询
              </a>

              {contact.wechatQrCode ? (
                <div className={styles.wechat}>
                  <Image
                    src={contact.wechatQrCode}
                    alt="新光扬微信咨询二维码"
                    width={132}
                    height={132}
                    className={styles.qrCode}
                  />
                  <span>微信咨询</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
