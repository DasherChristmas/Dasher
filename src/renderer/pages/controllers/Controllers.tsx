import './Controllers.scss';
import React, { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  ChevronDown,
  ChevronsDown,
  ChevronsUp,
  ChevronUp,
  Minus,
  Plus,
  Save,
  Trash2,
} from 'react-feather';
import { ipcRenderer } from 'electron';

import Button from '../../util/Button/Button';

import {
  controllersState,
  directoryState,
  hasControllerChangesState,
  selectedControllerState,
} from '../../appState';
import { appStateChannels, mainProcessChannels } from '../../../main/channels';
import { Controller, controllerSchema, SchemaDescriptor } from '../../types';
import TextInput from '../../util/TextInput/TextInput';
import useL10N from '../../util/l10n/l10n';
import TypeableDropdown from '../../util/TypeableDropdown/TypeableDropdown';
import controllerDefs from '../../../../controllers/controllers';
import Toggle from '../../util/Toggle/Toggle';
import NumberInput from '../../util/NumberInput/NumberInput';

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

const ControllerSection: React.FC<{
  elements: React.ReactNode[];
  name: string;
  localizedName?: string;
}> = ({ name, elements, localizedName }) => {
  const msg = useL10N();
  const [open, setOpen] = useState(false);
  return (
    <tr className={`Section ${open ? 'Open' : ''}`}>
      <th>
        <div>
          {localizedName ?? msg(`controllers/${name}`)}
          <div role="button" onClick={() => setOpen(!open)}>
            {open ? <Minus size="0.9rem" /> : <Plus size="0.9rem" />}
          </div>
        </div>
      </th>
      <td>
        <table>
          <tbody>{elements}</tbody>
        </table>
        <p>{msg('controllers/expandToEdit')}</p>
      </td>
    </tr>
  );
};

const ControllerProperty: React.FC<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
    controller: any;
    prop: string;
    def: SchemaDescriptor;
    onChange: (value: Controller[keyof Controller]) => void;
    suppress?: (e: React.SyntheticEvent<HTMLInputElement>) => boolean;
    localizedName?: string;
  }
> = ({
  controller,
  prop,
  def,
  onChange,
  suppress = () => false,
  localizedName,
  ...rest
}) => {
  const msg = useL10N();
  return (
    <tr>
      <th>{localizedName ?? msg(`controllers/${prop}`)}</th>
      <td>
        {(() => {
          switch (def.type) {
            case 'string': {
              return 'enum' in def ? (
                <TypeableDropdown
                  color="none"
                  key={`${controller.id}-${prop}`}
                  defaultValue={
                    controller[prop as keyof typeof controller] as string
                  }
                  options={def.enum || []}
                  onChangeCapture={(e) => {
                    if (suppress(e)) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  onChange={(v) => {
                    onChange(v);
                  }}
                  force
                  {...rest}
                />
              ) : (
                <TextInput
                  key={`${controller.id}-${prop}`}
                  color="none"
                  defaultValue={
                    controller[prop as keyof typeof controller] as string
                  }
                  onChange={(e) => {
                    if (suppress(e)) return;
                    onChange(e.target.value);
                  }}
                  {...rest}
                />
              );
            }
            case 'boolean': {
              return (
                <Toggle
                  key={`${controller.id}-${prop}`}
                  defaultChecked={
                    controller[prop as keyof typeof controller] as boolean
                  }
                  onChangeCapture={(e) => {
                    if (suppress(e)) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  onChange={(v) => {
                    onChange(v);
                  }}
                  {...rest}
                />
              );
            }
            case 'number': {
              return (
                <NumberInput
                  color="none"
                  key={`${controller.id}-${prop}`}
                  defaultValue={
                    controller[prop as keyof typeof controller] as number
                  }
                  onChange={(e) => {
                    if (suppress(e)) return;
                    onChange(Number(e.target.value));
                  }}
                  {...rest}
                />
              );
            }
            default: {
              return null;
            }
          }
        })()}
      </td>
    </tr>
  );
};

ControllerProperty.defaultProps = {
  suppress() {
    return false;
  },
};

const UniverseSize: React.FC<{
  idx: number;
  update: (count: number) => void;
}> = ({ idx, update }) => {
  const controllers = useRecoilValue(controllersState);
  const selectedController = useRecoilValue(selectedControllerState);
  const controller = controllers[selectedController];
  const msg = useL10N();

  return (
    <tr key={`${controller.id}-idividualSize-${idx}`}>
      <th>
        {msg(`controllers/individualSize`, {
          number: idx + 1,
        })}
      </th>
      <td>
        <NumberInput
          color="none"
          value={controller.universes[idx].maxChannels}
          onChange={(e) => update(Number(e.target.value))}
        />
      </td>
    </tr>
  );
};

const ControllerEditor: React.FC = () => {
  const [controllers, setControllers] = useRecoilState(controllersState);
  const selectedController = useRecoilValue(selectedControllerState);
  const controller = controllers[selectedController];
  const setHasChanges = useSetRecoilState(hasControllerChangesState);

  const updateController = useCallback(
    (newData: Partial<Controller>) => {
      const idx = selectedController;
      const newController = { ...controller, ...newData };
      const newControllers = [...controllers];
      newControllers.splice(idx, 1, newController);
      setControllers(newControllers);
      setHasChanges(true);
    },
    [controllers, controller, setControllers, selectedController, setHasChanges]
  );

  const msg = useL10N();

  return (
    <div className="Editor">
      <table>
        <tbody>
          {controller
            ? (() => {
                switch (controller.type) {
                  case 'Ethernet': {
                    return (
                      <>
                        <ControllerProperty
                          controller={controller}
                          prop="type"
                          def={controllerSchema.properties.type}
                          onChange={(value) => {
                            updateController({
                              // @ts-expect-error Cannot verify that it is in enum, but it's fine
                              type: value as string,
                            });
                          }}
                        />
                        <ControllerProperty
                          controller={controller}
                          prop="name"
                          def={controllerSchema.properties.name}
                          onChange={(value) => {
                            updateController({ name: value as string });
                          }}
                        />
                        <ControllerProperty
                          controller={controller}
                          prop="description"
                          def={controllerSchema.properties.description}
                          onChange={(value) => {
                            updateController({
                              description: value as string,
                            });
                          }}
                        />
                        <ControllerProperty
                          controller={controller}
                          prop="id"
                          def={controllerSchema.properties.id}
                          onChange={() => {}}
                          suppress={() => true}
                          onBlur={(e) => {
                            updateController({
                              id: Number(e.target.value),
                            });
                          }}
                          min={0}
                        />
                        <ControllerProperty
                          controller={controller}
                          prop="autoLayout"
                          def={controllerSchema.properties.autoLayout}
                          onChange={(value) => {
                            updateController({
                              autoLayout: value as boolean,
                            });
                          }}
                        />
                        <ControllerProperty
                          controller={controller}
                          prop="autoUpload"
                          def={controllerSchema.properties.autoUpload}
                          onChange={(value) => {
                            updateController({
                              autoUpload: value as boolean,
                            });
                          }}
                        />
                        <ControllerProperty
                          controller={controller}
                          prop="autoSize"
                          def={controllerSchema.properties.autoSize}
                          onChange={(value) => {
                            updateController({
                              autoSize: value as boolean,
                            });
                          }}
                        />
                        <ControllerProperty
                          controller={controller}
                          prop="active"
                          def={controllerSchema.properties.active}
                          onChange={(value) => {
                            updateController({
                              active: value as boolean,
                            });
                          }}
                        />
                        <ControllerProperty
                          controller={controller}
                          prop="vendor"
                          def={controllerSchema.properties.vendor}
                          onChange={(value) => {
                            updateController({
                              vendor: value as string,
                            });
                          }}
                        />
                        <ControllerProperty
                          controller={controller}
                          prop="model"
                          def={{
                            ...controllerSchema.properties.model,
                            enum:
                              controllerDefs.vendors[
                                controller.vendor?.toLowerCase() as keyof typeof controllerDefs['vendors']
                              ]?.controllers.map((c) => c.name) || [],
                          }}
                          onChange={(value) => {
                            updateController({
                              // @ts-expect-error Cannot verify that it is in enum, but it's fine
                              model: value as string,
                            });
                          }}
                        />
                        <ControllerProperty
                          controller={controller}
                          prop="variant"
                          def={{
                            ...controllerSchema.properties.variant,
                            enum:
                              (
                                controllerDefs.vendors[
                                  controller.vendor?.toLowerCase() as keyof typeof controllerDefs['vendors']
                                ]?.controllers || []
                              )
                                .find(
                                  (c) =>
                                    c.name.toLowerCase() ===
                                    controller.model?.toLowerCase()
                                )
                                ?.variants.map((v) => v.name) || [],
                          }}
                          onChange={(value) => {
                            updateController({
                              // @ts-expect-error Cannot verify that it is in enum, but it's fine
                              variant: value as string,
                            });
                          }}
                        />
                        <ControllerProperty
                          controller={controller}
                          prop="suppressDuplicateFrames"
                          def={
                            controllerSchema.properties.suppressDuplicateFrames
                          }
                          onChange={(value) => {
                            updateController({
                              suppressDuplicateFrames: value as boolean,
                            });
                          }}
                        />
                        {controller.protocol === 'E131' ||
                        controller.protocol === 'ArtNet' ? (
                          <ControllerProperty
                            controller={controller}
                            prop="multicast"
                            def={controllerSchema.properties.multicast}
                            onChange={(value) => {
                              updateController({
                                multicast: value as boolean,
                              });
                            }}
                          />
                        ) : null}
                        <ControllerProperty
                          controller={controller}
                          prop="ip"
                          def={controllerSchema.properties.ip}
                          onChange={(value) => {
                            updateController({
                              ip: value as string,
                            });
                          }}
                        />
                        <ControllerProperty
                          controller={controller}
                          prop="protocol"
                          def={controllerSchema.properties.protocol}
                          onChange={(value) => {
                            updateController({
                              // @ts-expect-error Cannot verify that it is in enum, but it's fine
                              protocol: value as string,
                              // @ts-expect-error Cannot verify that networkType it is in enum, but it's fine
                              universes: controller.universes.map(
                                (universe) => ({
                                  ...universe,
                                  networkType: value,
                                })
                              ),
                            });
                          }}
                        />
                        {controller.protocol === 'ArtNet' ||
                        controller.protocol === 'ZCPP' ? (
                          <ControllerProperty
                            controller={controller}
                            prop="priority"
                            def={controllerSchema.properties.priority}
                            onChange={(value) => {
                              updateController({
                                priority: value as number,
                              });
                            }}
                          />
                        ) : null}
                        <ControllerProperty
                          controller={{
                            id: controller.id,
                            startUniverse:
                              controller.universes[0]?.baudRate || 0,
                          }}
                          prop="startUniverse"
                          def={{
                            type: 'number',
                          }}
                          min={1}
                          onChange={(value) => {
                            updateController({
                              universes: controller.universes.map(
                                (universe, idx) => ({
                                  ...universe,
                                  baudRate: idx + (value as number),
                                })
                              ),
                            });
                          }}
                        />
                        <ControllerProperty
                          controller={{
                            id: controller.id,
                            universeCount: controller.universes.length,
                          }}
                          prop="universeCount"
                          def={{
                            type: 'number',
                          }}
                          min={1}
                          onChange={(value) => {
                            updateController({
                              universes: Array(value)
                                //@ts-expect-error
                                .fill(null)
                                .map((_, idx) => {
                                  if (controller.universes[idx])
                                    return controller.universes[idx];
                                  return {
                                    port: controller.ip,
                                    maxChannels: Number(
                                      controller.maxUniverseChannels
                                    ),
                                    networkType: controller.protocol,
                                    baudRate:
                                      idx + controller.universes[0].baudRate,
                                  };
                                }),
                            });
                          }}
                        />
                        <ControllerProperty
                          controller={controller}
                          prop="maxUniverseChannels"
                          def={controllerSchema.properties.maxUniverseChannels}
                          onChange={(value) => {
                            updateController({
                              maxUniverseChannels: value as number,
                              universes: controller.universes.map(
                                (universe) => ({
                                  ...universe,
                                  maxChannels: Number(value),
                                })
                              ),
                            });
                          }}
                        />
                        <ControllerSection
                          name="individualSizes"
                          elements={controller.universes.map(
                            (universe, idx) => (
                              <UniverseSize
                                idx={idx}
                                update={(value) => {
                                  const universes = [...controller.universes];
                                  universes.splice(idx, 1, {
                                    ...controller.universes[idx],
                                    maxChannels: value as number,
                                  });
                                  updateController({
                                    universes,
                                  });
                                }}
                              />
                            )
                          )}
                        />
                      </>
                    );
                  }
                  default: {
                    return null;
                  }
                }
              })()
            : null}
        </tbody>
      </table>
    </div>
  );
};

const blankController = (controllers: Controller[]) =>
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
            if (prop === 'id') {
              for (let i = 0; ; i++) {
                if (controllers.findIndex((c) => c.id === i) < 0) return i;
              }
            }
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
  const [hasChanges, setHasChanges] = useRecoilState(hasControllerChangesState);

  return (
    <div className="Controls">
      <Plus
        onClick={useCallback(() => {
          // @ts-expect-error TS cannot validate even though it is built from schema
          setControllers(controllers.concat([blankController(controllers)]));
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
      <Save
        className={hasChanges ? 'Change' : ''}
        onClick={useCallback(() => {
          ipcRenderer.send(appStateChannels.setControllers, controllers);
          setHasChanges(false);
        }, [controllers, setHasChanges])}
      />
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
                    .filter((_, i, a) => i === 0 || i === a.length - 1)
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
