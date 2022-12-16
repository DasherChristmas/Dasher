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
  hasControllerChangesState,
  portState,
  selectedControllerState,
} from './ControllersState';
import { directoryState } from '../../appState';
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
            title={msg('controllers/directory-open')}
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
  elements: React.ReactNode;
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
    suppress?: (e: React.FormEvent<HTMLInputElement>) => boolean;
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
  const ports = useRecoilValue(portState);

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
          {controller ? (
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
                  let id = Number(e.target.value);
                  let idx = controllers.findIndex((c) => c.id === id);
                  if (idx > -1 && idx !== selectedController) {
                    for (let i = 0; ; i++) {
                      if (controllers.findIndex((c) => c.id === i) < 0) {
                        id = i;
                        break;
                      }
                    }
                  }
                  updateController({
                    id,
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
                prop="activeState"
                def={controllerSchema.properties.activeState}
                onChange={(value) => {
                  updateController({
                    // @ts-expect-error
                    activeState: value as string,
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
              {(() => {
                switch (controller.type) {
                  case 'Ethernet': {
                    return (
                      <>
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
                          def={{
                            ...controllerSchema.properties.protocol,
                            enum: ['ArtNet', 'DDP', 'E131', 'OPC', 'ZCPP'],
                          }}
                          onChange={(value) => {
                            updateController({
                              protocol: value as string,
                              universes: controller.universes.map(
                                (universe) => ({
                                  ...universe,
                                  networkType: value as string,
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
                                .fill('')
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
                        {controller.protocol === 'E131' ||
                        controller.protocol === 'ArtNet' ? (
                          <ControllerSection
                            name="individualSizes"
                            elements={controller.universes.map((_, idx) => (
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
                            ))}
                          />
                        ) : null}
                        {controller.protocol === 'DDP' ? (
                          <ControllerProperty
                            controller={controller}
                            prop="channelsPerPacket"
                            def={controllerSchema.properties.channelsPerPacket}
                            onChange={(v) => {
                              updateController({
                                channelsPerPacket: v as number,
                              });
                            }}
                            defaultValue={controller.channelsPerPacket ?? 1440}
                          />
                        ) : null}
                        {controller.protocol === 'ZCPP' ||
                        controller.protocol === 'DDP' ? (
                          <ControllerProperty
                            controller={controller}
                            prop="channels"
                            def={controllerSchema.properties.channels}
                            onChange={(v) => {
                              updateController({
                                channels: v as number,
                              });
                            }}
                            disabled={controller.autoSize}
                          />
                        ) : null}
                      </>
                    );
                  }
                  case 'USB': {
                    return (
                      <>
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
                        <ControllerProperty
                          controller={controller}
                          prop="port"
                          def={{
                            ...controllerSchema.properties.port,
                            enum: ['Not Connected'].concat(ports),
                          }}
                          onChange={(value) => {
                            controller;
                            updateController({
                              port: value as string,
                            });
                          }}
                        />
                        <ControllerProperty
                          controller={controller}
                          prop="protocol"
                          def={{
                            ...controllerSchema.properties.protocol,
                            enum: [
                              'DMX',
                              'LOR',
                              'LOR Optimised',
                              'OpenDMX',
                              'Pixelnet -Open',
                              'Renard',
                              'D-Light',
                              'Generic Serial',
                            ],
                          }}
                          onChange={(value) => {
                            updateController({
                              protocol: value as string,
                              universes: controller.universes.map(
                                (universe) => ({
                                  ...universe,
                                  networkType: value as string,
                                })
                              ),
                            });
                          }}
                        />
                        {controller.protocol !== 'LOR Optimised' ? (
                          <ControllerProperty
                            controller={controller}
                            prop="channels"
                            def={controllerSchema.properties.channels}
                            onChange={(v) => {
                              updateController({
                                channels: v as number,
                              });
                            }}
                            disabled={controller.autoSize}
                            defaultValue={controller.channels ?? 512}
                          />
                        ) : null}
                        {controller.protocol === 'LOR Optimised' ? (
                          <>
                            <ControllerProperty
                              controller={{
                                ...controller,
                                deviceCount: controller.devices?.length ?? 0,
                              }}
                              prop="deviceCount"
                              def={{
                                type: 'number',
                              }}
                              min={0}
                              suppress={(e) =>
                                Number((e.target as HTMLInputElement).value) < 0
                              }
                              onChange={(v) => {
                                updateController({
                                  devices: Array(v)
                                    .fill('')
                                    .map((_, idx) => {
                                      if (controller.devices?.[idx])
                                        return controller.devices[idx];
                                      return {
                                        deviceType: 'AC Controller',
                                        addressMode: 'Normal',
                                        unitID: idx + 1,
                                        description: '',
                                      };
                                    }),
                                });
                              }}
                              disabled={controller.autoSize}
                            />
                            {controller.devices
                              ? controller.devices.map((device, deviceidx) => (
                                  <ControllerSection
                                    name={`${controller.id}-devices`}
                                    key={`${controller.id}-device-${deviceidx}`}
                                    localizedName={msg('controllers/device', {
                                      number: deviceidx + 1,
                                    })}
                                    elements={
                                      <>
                                        <ControllerProperty
                                          controller={{
                                            ...controller,
                                            id: `${controller.id}-device-${deviceidx}`,
                                            deviceType: device.deviceType,
                                          }}
                                          prop="deviceType"
                                          def={
                                            controllerSchema.properties.devices
                                              .items.properties.deviceType
                                          }
                                          onChange={(v) => {
                                            const devices = [
                                              ...(controller.devices || []),
                                            ];
                                            devices.splice(deviceidx, 1, {
                                              ...devices[deviceidx],
                                              // @ts-expect-error
                                              deviceType: v,
                                            });
                                            updateController({
                                              devices,
                                            });
                                          }}
                                        />
                                        <ControllerProperty
                                          controller={{
                                            ...controller,
                                            id: `${controller.id}-device-${deviceidx}`,
                                            unitID: device.unitID,
                                          }}
                                          prop="unitID"
                                          def={
                                            controllerSchema.properties.devices
                                              .items.properties.unitID
                                          }
                                          min={1}
                                          suppress={(e) =>
                                            Number(
                                              (e.target as HTMLInputElement)
                                                .value
                                            ) < 1
                                          }
                                          onChange={(v) => {
                                            const devices = [
                                              ...(controller.devices || []),
                                            ];
                                            devices.splice(deviceidx, 1, {
                                              ...devices[deviceidx],
                                              unitID: Number(v),
                                            });
                                            updateController({
                                              devices,
                                            });
                                          }}
                                        />
                                        {!device.deviceType.startsWith(
                                          'Pixie'
                                        ) ? (
                                          <ControllerProperty
                                            controller={{
                                              ...controller,
                                              id: `${controller.id}-device-${deviceidx}`,
                                              addressMode: device.addressMode,
                                            }}
                                            prop="addressMode"
                                            def={
                                              controllerSchema.properties
                                                .devices.items.properties
                                                .addressMode
                                            }
                                            onChange={(v) => {
                                              const devices = [
                                                ...(controller.devices || []),
                                              ];
                                              devices.splice(deviceidx, 1, {
                                                ...devices[deviceidx],
                                                // @ts-expect-error
                                                addressMode: v,
                                              });
                                              updateController({
                                                devices,
                                              });
                                            }}
                                          />
                                        ) : null}
                                        <ControllerProperty
                                          controller={{
                                            ...controller,
                                            id: `${controller.id}-device-${deviceidx}`,
                                            description: device.description,
                                          }}
                                          prop="description"
                                          def={
                                            controllerSchema.properties.devices
                                              .items.properties.description
                                          }
                                          onChange={(v) => {
                                            const devices = [
                                              ...(controller.devices || []),
                                            ];
                                            devices.splice(deviceidx, 1, {
                                              ...devices[deviceidx],
                                              description: v as string,
                                            });
                                            updateController({
                                              devices,
                                            });
                                          }}
                                        />
                                      </>
                                    }
                                  />
                                ))
                              : null}
                          </>
                        ) : null}
                      </>
                    );
                  }
                  case 'Null': {
                    return (
                      <>
                        <ControllerProperty
                          controller={controller}
                          prop="channels"
                          def={controllerSchema.properties.channels}
                          onChange={(v) => {
                            updateController({
                              channels: v as number,
                            });
                          }}
                          defaultValue={controller.channels ?? 512}
                        />
                      </>
                    );
                  }
                  default: {
                    return null;
                  }
                }
              })()}
            </>
          ) : null}
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
          setHasChanges(true);
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
