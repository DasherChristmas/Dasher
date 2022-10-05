import React, { useEffect, useState } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { ipcRenderer } from 'electron';
import TypedEmitter from '../../common/typedEmitter';
import './StatusBar.scss';
import { mainProcessChannels } from '../../main/channels';

const filePathState = atom({
  key: 'sequenceFilePath',
  default: '',
});

export const statusTextState = atom({
  key: 'statusText',
  default: '',
});

export const statusBarEmitter = new TypedEmitter<{
  setProgress: [number];
  setProgressMode: ['normal' | 'indeterminate' | 'error' | 'paused'];
  clearProgress: [];
}>();

(window as any).statusBarEmitter = statusBarEmitter;

statusBarEmitter.on('setProgress', (percent) => {
  ipcRenderer.send(mainProcessChannels.setProgress, percent);
});
statusBarEmitter.on('setProgressMode', (type) => {
  ipcRenderer.send(mainProcessChannels.setProgressMode, type);
});
statusBarEmitter.on('clearProgress', () => {
  ipcRenderer.send(mainProcessChannels.setProgress, 0);
});

const StatusBar: React.FC = () => {
  const [sequenceFilePath, setFilePath] = useRecoilState(filePathState);
  const statusText = useRecoilValue(statusTextState);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [hidden, setHidden] = useState(true);
  const [mode, setMode] = useState<
    'normal' | 'indeterminate' | 'error' | 'paused'
  >('normal');
  useEffect(() => {
    const progressListener = (percent: number) => {
      if (percent <= 0) setHidden(true);
      else if (hidden) setHidden(false);
      setProgressBarValue(percent);
    };
    statusBarEmitter.on('setProgress', progressListener);
    const typeListener = (
      type: 'normal' | 'indeterminate' | 'error' | 'paused'
    ) => {
      setMode(type);
    };
    statusBarEmitter.on('setProgressMode', typeListener);
    const clearListener = () => {
      progressListener(0);
    };
    statusBarEmitter.on('clearProgress', clearListener);
    const cleanupPathListener = (
      _: Electron.IpcRendererEvent,
      filePath: string
    ) => {
      setFilePath(filePath as string);
    };
    ipcRenderer.on(mainProcessChannels.openSequence, cleanupPathListener);

    return () => {
      ipcRenderer.off(mainProcessChannels.openSequence, cleanupPathListener);
      statusBarEmitter.off('setProgress', progressListener);
      statusBarEmitter.off('setProgressMode', typeListener);
      statusBarEmitter.off('clearProgress', clearListener);
    };
  }, [hidden, setHidden, setMode, setFilePath]);
  return (
    <div className="StatusBar">
      <p>
        {sequenceFilePath ? (
          <>
            Editing sequence:{' '}
            <code className="SequencePath">{sequenceFilePath}</code>
          </>
        ) : null}
      </p>
      <div className={`ProgressBarContainer ${hidden ? 'hidden' : ''}`}>
        <div
          className={`ProgressBar ${mode}`}
          style={{
            width: `${progressBarValue * 100}%`,
          }}
        >
          <p>{`${(progressBarValue * 100).toFixed()}%`}</p>
        </div>
      </div>
      <p className="StatusText">{statusText}</p>
    </div>
  );
};

export default StatusBar;
