export interface NodeItem {
  nodeName?: string | symbol;
  nodeType?: string | symbol;
  id: string;
  parentId?: string | symbol;
  nodes?: NodeItem[];
  tag?: string;
  menus?: NodeItem[];
}

export interface MenuItem {
  name: string;
  type: "MENU" | "OPERATION";
  id: string;
  parentId?: string;
  tag: string;
  menus: MenuItem[];
  operationKey?: string;
  url?: string;
}

export interface TreeItemProps extends NodeItem {
  data?: NodeItem;
  expanded?: boolean;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
  checked?: boolean;
  isLeaf?: boolean;
  selectable?: boolean;
  checkable?: boolean;
  disableCheckbox?: boolean;
  selected?: boolean;
  loaded?: boolean;
  halfChecked?: boolean;
  dragOver?: boolean;
  dragOverGapTop?: boolean;
  dragOverGapBottom?: boolean;
}

export interface SelectKey {
  checked: string[];
  halfChecked?: string[];
}
