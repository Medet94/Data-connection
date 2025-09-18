import * as React from 'react';
import { SVGIconContainer, Icons, IconSize } from '@blueprintjs/icons';
import type { IconName } from '@blueprintjs/icons';

export type BluePrintIconName = IconName;

export interface IconProps {
  name: BluePrintIconName;
  size?: number;
  className?: string;
  color?: string | 'currentColor';
  autoLoad?: boolean;
  title?: string;
  tagName?: string;
  style?: React.CSSProperties;
  onPathsLoaded?: (paths: string[]) => void;
}

export const BluePrintIcon = React.forwardRef<HTMLElement, IconProps>(
  function Icon(
    {
      autoLoad = true,
      className = '',
      color = 'currentColor',
      name,
      tagName = 'span',
      title,
      size = IconSize.STANDARD,
      style,
      onPathsLoaded,
      ...htmlProps
    },
    ref
  ) {
    const [iconPaths, setIconPaths] = React.useState<string[] | undefined>(
      undefined
    );

    React.useEffect(() => {
      let cancelLoading = false;

      if (typeof name === 'string') {
        const loadedPaths = Icons.getPaths(name, size);

        if (loadedPaths) {
          setIconPaths(loadedPaths);
          onPathsLoaded?.(loadedPaths);
        } else if (autoLoad) {
          Icons.load(name, size)
            .then(() => {
              if (!cancelLoading) {
                const paths = Icons.getPaths(name, size);
                setIconPaths(paths);
                if (paths) onPathsLoaded?.(paths);
              }
            })
            .catch((err) => {
              console.error(`[Blueprint] Icon '${name}' failed to load.`, err);
            });
        }
      }

      return () => {
        cancelLoading = true;
      };
    }, [autoLoad, name, size, onPathsLoaded]);

    if (!name) return null;
    if (typeof name !== 'string') return name;

    if (!iconPaths) {
      return React.createElement(tagName, {
        'aria-hidden': title ? undefined : true,
        className,
        'data-icon': name,
        ref,
        title,
        ...htmlProps,
      });
    }

    const pathElements = iconPaths.map((d, i) => (
      <path key={i} d={d} fillRule="evenodd" />
    ));

    return (
      <SVGIconContainer
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...(style || {}),
        }}
        className={className}
        color={color}
        htmlTitle={title}
        iconName={name}
        size={size}
        title={title}
        ref={ref}
        {...htmlProps}
      >
        {pathElements}
      </SVGIconContainer>
    );
  }
);
