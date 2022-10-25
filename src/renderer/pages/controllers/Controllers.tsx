import './Controllers.scss';
import React, { useCallback, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ChevronDown,
  ChevronsDown,
  ChevronsUp,
  ChevronUp,
  Plus,
  Save,
  Trash2,
} from 'react-feather';
import { ipcRenderer } from 'electron';
import memoizee from 'memoizee';

import Button from '../../util/Button/Button';

import {
  controllersState,
  directoryState,
  selectedControllerState,
} from '../../appState';
import { appStateChannels, mainProcessChannels } from '../../../main/channels';
import { Controller, controllerSchema } from '../../types';
import TextInput from '../../util/TextInput/TextInput';
import useL10N from '../../util/l10n/l10n';
import TypeableDropdown from '../../util/TypeableDropdown/TypeableDropdown';
import controllerDefs from '../../../../controllers/controllers';

const DirectorySelection: React.FC = () => {
  const directory = useRecoilValue(directoryState);
  const msg = useL10N();

  return (
    <section className="DirectorySelection Section">
      <header className="SectionTitle">
        {msg('controllers/directory-title')}
      </header>
      <div>
        <p className="Current">
          {msg('controllers/directory-prefix')}{' '}
          <button
            type="button"
            onClickCapture={() => {
              ipcRenderer.send(mainProcessChannels.openFolder, directory);
            }}
            tabIndex={-1}
          >
            <code>{directory}</code>
          </button>
        </p>
        <Button
          color="tertiary"
          aria-label={msg('controllers/change-temp')}
          onClick={() => {
            ipcRenderer.send(appStateChannels.setDirectory, false);
          }}
        >
          {msg('controllers/change-temp')}
        </Button>
        <Button
          color="red"
          aria-label={msg('controllers/change-perm')}
          onClick={() => {
            ipcRenderer.send(appStateChannels.setDirectory, true);
          }}
        >
          {msg('controllers/change-perm')}
        </Button>
      </div>
    </section>
  );
};

const ControllerEditor: React.FC = () => {
  const [controllers, setControllers] = useRecoilState(controllersState);
  const selectedController = useRecoilValue(selectedControllerState);
  const controller = controllers[selectedController];

  const updateControllerProperty = useCallback(
    <P extends keyof Controller>(prop: P, value: typeof controller[P]) => {
      const idx = selectedController;
      const newController = { ...controller };
      newController[prop] = value;
      const newControllers = [...controllers];
      newControllers.splice(idx, 1, newController);
      setControllers(newControllers);
    },
    [controllers, controller, setControllers, selectedController]
  );
  const msg = useL10N();

  return (
    <div className="Editor">
      <table>
        <tbody>
          {controller
            ? Object.entries(controllerSchema.properties).map(
                ([prop, value]) => {
                  switch (value.type) {
                    case 'string': {
                      return (
                        <tr key={`${controller.id}-${prop}`}>
                          <th>{msg(`controllers/${prop}`)}</th>
                          <td>
                            {'enum' in value ? (
                              <TypeableDropdown
                                defaultValue={
                                  controller[
                                    prop as keyof typeof controller
                                  ] as string
                                }
                                options={
                                  // eslint-disable-next-line no-nested-ternary
                                  prop === 'model'
                                    ? controllerDefs.vendors[
                                        controller.vendor.toLowerCase() as keyof typeof controllerDefs['vendors']
                                      ]?.controllers.map((c) => c.name) || []
                                    : prop === 'variant'
                                    ? (
                                        controllerDefs.vendors[
                                          controller.vendor.toLowerCase() as keyof typeof controllerDefs['vendors']
                                        ]?.controllers || []
                                      )
                                        .find(
                                          (c) =>
                                            c.name.toLowerCase() ===
                                            controller.model?.toLowerCase()
                                        )
                                        ?.variants.map((v) => v.name) || []
                                    : value.enum
                                }
                                onChange={(v) => {
                                  // @ts-expect-error Cannot determine overlap, but we won't let users add extras anyway
                                  updateControllerProperty(prop, v);
                                }}
                                force
                              />
                            ) : (
                              <TextInput
                                color="none"
                                defaultValue={
                                  controller[
                                    prop as keyof typeof controller
                                  ] as string
                                }
                                onChange={(e) => {
                                  updateControllerProperty(
                                    // @ts-expect-error Cannot determine overlap, but we won't let users add extras anyway
                                    prop,
                                    e.target.value
                                  );
                                }}
                              />
                            )}
                          </td>
                        </tr>
                      );
                    }
                    default: {
                      return null;
                    }
                  }
                }
              )
            : null}
        </tbody>
      </table>
    </div>
  );
};

const blankController = () =>
  Object.fromEntries(
    Object.entries(controllerSchema.properties).map(([prop, desc]) => [
      prop,
      (() => {
        if ('optional' in desc && desc.optional) return undefined;
        switch (desc.type) {
          case 'string': {
            return 'enum' in desc ? desc.enum[0] : '';
          }
          case 'number': {
            return 0;
          }
          case 'boolean': {
            return false;
          }
          case 'array': {
            return [];
          }
          default: {
            return undefined;
          }
        }
      })(),
    ])
  );

const Controls: React.FC = () => {
  const [controllers, setControllers] = useRecoilState(controllersState);
  const [selectedController, selectController] = useRecoilState(
    selectedControllerState
  );

  return (
    <div className="Controls">
      <Plus
        onClick={useCallback(() => {
          // @ts-expect-error TS cannot validate even though it is built from schema
          setControllers(controllers.concat([blankController()]));
          selectController(controllers.length);
        }, [controllers, setControllers, selectController])}
      />
      <div className="Seperator" />
      <ChevronsUp
        onClick={useCallback(() => {
          const newControllers = [...controllers];
          const [controller] = newControllers.splice(selectedController, 1);
          newControllers.unshift(controller);
          selectController(0);
          setControllers(newControllers);
        }, [controllers, setControllers, selectedController, selectController])}
      />
      <ChevronUp
        onClick={useCallback(() => {
          const newControllers = [...controllers];
          const [controller] = newControllers.splice(selectedController, 1);
          newControllers.splice(selectedController - 1, 0, controller);
          selectController(selectedController - 1);
          setControllers(newControllers);
        }, [controllers, setControllers, selectedController, selectController])}
      />
      <ChevronDown
        onClick={useCallback(() => {
          const newControllers = [...controllers];
          const [controller] = newControllers.splice(selectedController, 1);
          newControllers.splice(selectedController + 1, 0, controller);
          selectController(selectedController + 1);
          setControllers(newControllers);
        }, [controllers, setControllers, selectedController, selectController])}
      />
      <ChevronsDown
        onClick={useCallback(() => {
          const newControllers = [...controllers];
          const [controller] = newControllers.splice(selectedController, 1);
          newControllers.push(controller);
          selectController(newControllers.length - 1);
          setControllers(newControllers);
        }, [controllers, setControllers, selectedController, selectController])}
      />
      <div className="Seperator" />
      <Trash2
        onClick={useCallback(() => {
          const newControllers = [...controllers];
          newControllers.splice(selectedController, 1);
          selectController(0);
          setControllers(newControllers);
        }, [controllers, setControllers, selectedController, selectController])}
      />
    </div>
  );
};

const ControllersPanel: React.FC = () => {
  const controllers = useRecoilValue(controllersState);
  const [selectedController, setSelectedController] = useRecoilState(
    selectedControllerState
  );

  const msg = useL10N();

  return (
    <section className="ControllersPanel Section">
      <header className="SectionTitle">
        {msg('controllers/controllers-title')}
      </header>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelectedController(-1);
        }}
        className="Container"
      >
        <table className="Panel">
          <thead>
            <tr>
              <th>{msg('controllers/name')}</th>
              <th>{msg('controllers/protocol')}</th>
              <th>{msg('controllers/address')}</th>
              <th>{msg('controllers/universe-id')}</th>
              <th>{msg('controllers/channel-count')}</th>
              <th>{msg('controllers/description')}</th>
            </tr>
          </thead>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role */}
          <tbody role="menu">
            {controllers.map((controller, cidx) => (
              <tr
                key={controller.name + controller.id}
                role="menuitem"
                onClick={() => {
                  setSelectedController(cidx);
                }}
                className={selectedController === cidx ? 'Selected' : ''}
              >
                <td>{controller.name}</td>
                <td>{controller.protocol}</td>
                <td>{controller.ip}</td>
                <td>
                  {controller.universes
                    .map((u) => u.baudRate)
                    .sort((a, b) => a - b)
                    .filter((u, i, a) => i === 0 || i === a.length - 1)
                    .join('-')}
                </td>
                <td>
                  {controller.universes.reduce((p, u) => p + u.maxChannels, 0)}
                </td>
                <td>{controller.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Controls />
      </div>
      <ControllerEditor />
    </section>
  );
};

const Controllers: React.FC = () => (
  <div className="ControllersContainer">
    <DirectorySelection />
    <ControllersPanel />
  </div>
);

export default Controllers;
