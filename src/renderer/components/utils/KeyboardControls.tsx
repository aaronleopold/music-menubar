import React, { useEffect } from 'react';

export type KeyboardEventTypes = 'keyup' | 'keydown';

export interface IKeyboardControlsProps {
  mappings: Map<KeyboardEventTypes, Map<string, (event: KeyboardEvent) => any>>; // map both an event type (e.g: keyUp) and a key
}

// while this component could be made a function, it is more practical to have it self-contained into a function component
// so that there is no doubt about having to remove the listener when calling it.
export const KeyboardControls: React.FunctionComponent<IKeyboardControlsProps> = ({
  mappings,
}) => {
  mappings.forEach((behaviourMap, eventName) => {
    useEffect(() => {
      // add the keyMatcher for each keyboardEventType
      const keyMatcher = matchKey(behaviourMap);
      window.addEventListener(eventName, keyMatcher);

      // on unmount remove the listener
      return () => {
        window.removeEventListener(eventName, keyMatcher);
      };
    });
  });

  return <></>;
};

// This functiion uses currying since it needs to be used in addEventListener and removeEventListener
const matchKey = (behaviourMap: Map<string, (event: KeyboardEvent) => any>) => (
  event: KeyboardEvent
) => {
  const eventKey = event.key;
  if (behaviourMap.has(eventKey)) {
    behaviourMap.get(eventKey)!(event);
  }
};
