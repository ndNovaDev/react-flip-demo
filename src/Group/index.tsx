import { Collapse } from 'antd';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { useImmer } from 'use-immer';
import { List } from '../List';
import anime from 'animejs';

const { Panel } = Collapse;

export function Group() {
  const [abnormalList, setAbnormalList] = useImmer<string[]>([
    'bb',
    'ccc',
    'dddd',
    'eeeee',
    'ffffff',
  ]);
  const [fixedList, setFixedList] = useImmer<string[]>([]);
  const [normalList] = useImmer(['a']);

  const info = {
    abnormalList: abnormalList.length,
    fixedList: fixedList.length,
    normalList: normalList.length,
  };
  const k = JSON.stringify(info);

  return (
    <>
      <div>
        <button
          onClick={() => {
            if (abnormalList.length) {
              const item = abnormalList[0];
              setAbnormalList((draft) => {
                draft.shift();
              });
              setFixedList((draft) => {
                draft.push(item);
              });
            }
          }}
        >
          fix first one
        </button>
        <button
          onClick={() => {
            if (abnormalList.length >= 2) {
              const item = abnormalList[1];
              setAbnormalList((draft) => {
                draft.splice(1, 1);
              });
              setFixedList((draft) => {
                draft.push(item);
              });
            }
          }}
        >
          fix second one
        </button>
        <button
          onClick={() => {
            if (abnormalList.length) {
              const item = abnormalList[abnormalList.length - 1];
              setAbnormalList((draft) => {
                draft.pop();
              });
              setFixedList((draft) => {
                draft.push(item);
              });
            }
          }}
        >
          fix last one
        </button>
      </div>
      <Flipper flipKey={k} decisionData={info}>
        {abnormalList.length > 0 && (
          <Flipped
            flipId="abnormalList"
            translate={true}
            onExit={(el, _, removeElement) => {
              anime({
                targets: el,
                opacity: [1, 0],
                duration: 100,
                complete: removeElement,
                easing: 'easeInOutQuad',
              });
            }}
          >
            <div>
              <Collapse defaultActiveKey={['abnormalList']}>
                <Panel header="异常驱动" key="abnormalList">
                  <List type="abnormalList" names={abnormalList}></List>
                </Panel>
              </Collapse>
            </div>
          </Flipped>
        )}
        {fixedList.length > 0 && (
          <Flipped
            flipId="fixedList"
            translate={true}
            onAppear={(el) => {
              anime({
                targets: [el],
                opacity: [0, 1],
                duration: 200,
                easing: 'easeInOutQuad',
              });
            }}
          >
            <div>
              <Collapse defaultActiveKey={['fixedList']}>
                <Panel header="已修复驱动" key="fixedList">
                  <List type="fixedList" names={fixedList}></List>
                </Panel>
              </Collapse>
            </div>
          </Flipped>
        )}
        {normalList.length > 0 && (
          <Flipped flipId="normalList" translate={true}>
            <div>
              <Collapse defaultActiveKey={['normalList']}>
                <Panel header="正常驱动" key="normalList">
                  <List type="normalList" names={normalList}></List>
                </Panel>
              </Collapse>
            </div>
          </Flipped>
        )}
      </Flipper>
    </>
  );
}
