import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiChevronDown, HiMinus, HiPlus } from 'react-icons/hi2';
import Screen from 'components/Screen';
import Asset from 'components/Asset';
import { useChoreo } from 'animation/ScreenTransition';
import { FAQ_CATEGORIES } from './faqData';
import { faqMotion as v } from './Faq.motion';
import styles from './Faq.module.scss';

const collapse = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
};

/**
 * Step 8 (Menu_Mobile-6) – FAQ.
 * Two-level accordion: one category open at a time, one question open at a time.
 * The list is `data-scrollable`, so if it overflows, wheel/swipe scrolls the list
 * first and only changes step once the list hits its top/bottom edge.
 */
export default function Faq() {
  const m = useChoreo();
  const [openCategory, setOpenCategory] = useState(FAQ_CATEGORIES[0].id);
  const [openQuestion, setOpenQuestion] = useState(0);

  const toggleCategory = (id) => {
    setOpenCategory((cur) => (cur === id ? null : id));
    setOpenQuestion(null);
  };

  const toggleQuestion = (i) => setOpenQuestion((cur) => (cur === i ? null : i));

  return (
    <Screen bg={styles.bg}>
      <Asset name="faqBalloons" label="Heart + X balloons" className={styles.balloons} {...m(v.balloons)} />

      <motion.h2 className={styles.title} {...m(v.title)}>
        Got a question?
        <br />
        Most do!
      </motion.h2>

      <motion.div className={styles.list} data-scrollable {...m(v.list)}>
        {FAQ_CATEGORIES.map((cat) => {
          const catOpen = openCategory === cat.id;
          return (
            <section key={cat.id} className={styles.category}>
              <button
                type="button"
                className={styles.categoryHead}
                onClick={() => toggleCategory(cat.id)}
                aria-expanded={catOpen}
              >
                {cat.title}
                <HiChevronDown className={styles.chevron} />
              </button>

              <AnimatePresence initial={false}>
                {catOpen && (
                  <motion.div key="items" className={styles.itemsWrap} {...collapse}>
                    <div className={styles.items}>
                      {cat.items.map((item, i) => {
                        const qOpen = openQuestion === i;
                        return (
                          <div key={item.q} className={styles.item}>
                            <button
                              type="button"
                              className={styles.question}
                              onClick={() => toggleQuestion(i)}
                              aria-expanded={qOpen}
                            >
                              <span>{item.q}</span>
                              {qOpen ? <HiMinus className={styles.sign} /> : <HiPlus className={styles.sign} />}
                            </button>
                            <AnimatePresence initial={false}>
                              {qOpen && (
                                <motion.div key="a" className={styles.answerWrap} {...collapse}>
                                  <p className={styles.answer}>{item.a}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          );
        })}
      </motion.div>
    </Screen>
  );
}
