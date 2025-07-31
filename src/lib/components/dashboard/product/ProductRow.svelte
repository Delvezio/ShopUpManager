<!-- src/lib/components/dashboard/product/ProductRow.svelte -->
<script lang="ts">
    import EditableCell from '$lib/components/ui/EditableCell.svelte';
    import DiscountToggle from '$lib/components/ui/DiscountToggle.svelte';
  
    export let product: any;
    /** Callback che il padre usa per salvare le modifiche */
    export let onUpdate: (updated: any) => void;
  
    function updateField(field: string, value: any) {
      // Normalizzo i numeri se serve
      const parsed = typeof value === 'string' && /^\d+(\.\d+)?$/.test(value)
        ? parseFloat(value)
        : value;
      product[field] = parsed;
      onUpdate(product);
    }
  
    function toggleField(field: string, checked: boolean) {
      product[field] = checked;
      onUpdate(product);
    }
  </script>
  
  <tr class="border-b border-gray-200 text-sm text-gray-800">
    <td class="px-4 sm:px-6 py-2">{product.handle}</td>
    <td class="px-4 sm:px-6 py-2">{product.sku}</td>
  
    <!-- Nome prodotto editabile -->
    <td class="px-4 sm:px-6 py-2">
      <EditableCell
        value={product.name}
        onChange={(v) => updateField('name', v)}
        className="text-gray-900 text-sm"
      />
    </td>
  
    <td class="px-4 sm:px-6 py-2">{product.barcode}</td>
    <td class="px-4 sm:px-6 py-2 text-left">{product.cost_price}€</td>
    <td class="px-4 sm:px-6 py-2 text-left">{product.full_price}€</td>
    
  
    <!-- Sconto Max + toggle -->
    <td class="px-4 sm:px-6 py-2 text-left">
      <div class="flex items-center justify-start gap-2">
        <DiscountToggle
          checked={product.max_discount_active}
          onToggle={(v) => toggleField('max_discount_active', v)}
        />
        <span class="whitespace-nowrap">{product.max_discount}%</span>
      </div>
    </td>
  
    <!-- Sconto Custom + toggle -->
    <td class="px-4 sm:px-6 py-2 text-left">
      <div class="flex items-center justify-start gap-2">
        
        <DiscountToggle
          checked={product.custom_discount_active}
          onToggle={(v) => toggleField('custom_discount_active', v)}
        />
        <EditableCell
          type="text"
          value={product.custom_discount ?? ''}
          placeholder="es. 10%"
          onChange={(v) => updateField('custom_discount', v)}
          className="w-16 text-left"
        />
      </div>
    </td>

    <td class="px-4 sm:px-6 py-2 text-left">{product.discount_price}€</td>
    <td class="px-4 sm:px-6 py-2 text-center">{product.stock}</td>
    <td class="px-4 sm:px-6 py-2 text-left">{product.sync_status}</td>
    <td class="px-4 sm:px-6 py-2 text-sm text-gray-500">{product.last_updated}</td>


  </tr>
  