const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        name: action.payload.name || state.name,
        price: action.payload.price || state.price,
        description: action.payload.description || state.description,
        material: action.payload.material || state.material,
        fabric: action.payload.fabric || state.fabric,
        fabric_warehouse:
          action.payload.fabric_warehouse || state.fabric_warehouse,
        color: action.payload.color || state.color,
        size: action.payload.size || state.size,
        catalog_key_name:
          action.payload.catalog_key_name || state.catalog_key_name,
        subcatalog_id: action.payload.subcatalog_id || state.subcatalog_id,
      };
    case "NULL":
      return {
        name: null,
        price: null,
        description: null,
        material: null,
        fabric: null,
        fabric_warehouse: null,
        color: null,
        size: null,
        catalog_key_name: null,
        subcatalog_id: null,
      };
    default:
      return state;
  }
};

export default reducer;
