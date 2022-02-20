import anime from 'animejs';
import { Flipped, Flipper } from 'react-flip-toolkit';

interface ListProps {
  type: string;
  names: string[];
}

export function List(props: ListProps) {
  const names = props.names;
  return (
    <div>
      {names.map((name) => {
        return (
          <Flipped
            key={name + props.type}
            flipId={name + props.type}
            shouldFlip={(p, c) => {
              return p[props.type] > c[props.type];
            }}
            opacity={true}
            translate={true}
            onExit={(el, _, removeEl) => {
              anime({
                targets: el,
                opacity: [1, 0],
                duration: 100,
                complete: removeEl,
                easing: 'easeInOutQuad',
              });
            }}
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
              <div>{name}</div>
              <div>name is :{name}</div>
            </div>
          </Flipped>
        );
      })}
    </div>
  );
}
