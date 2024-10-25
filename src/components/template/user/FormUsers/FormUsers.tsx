import { CardForm, FormInput, FormSelect } from "@/components/atom";
import { useFormUsers } from "@/hooks";

export const FormUsers = () => {
  const { formik, isEdit, handleClose, roleData, areaData } = useFormUsers();

  return (
    <CardForm
      title={isEdit ? "Editar Usuario" : "Crear Nuevo Usuario"}
      description="Complete la información del usuario y sus credenciales de acceso."
      handleSubmit={formik.handleSubmit}
      isSubmitting={formik.isSubmitting}
      submitButtonText={isEdit ? "Actualizar Usuario" : "Crear Usuario"}
      onClose={handleClose}
      className="mt-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormInput
            label="Nombre de Usuario"
            name="name"
            placeholder="Nombre para iniciar sesión"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.name}
          />
        </div>
        <div className="space-y-2">
          <FormInput
            label="Correo Electrónico"
            name="email"
            type="email"
            placeholder="correo@empresa.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.email}
          />
        </div>
        {isEdit ? null : (
          <div className="space-y-2">
            <FormInput
              label="Contraseña"
              name="password"
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.errors.password}
            />
          </div>
        )}
        <div className="space-y-2">
          <FormInput
            label="Nombre(s) del Colaborador"
            name="collaboratorName"
            placeholder="Nombres completos"
            value={formik.values.collaboratorName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.collaboratorName}
          />
        </div>
        <div className="space-y-2">
          <FormInput
            label="Apellidos del Colaborador"
            name="collaboratorLastName"
            placeholder="Apellidos completos"
            value={formik.values.collaboratorLastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.collaboratorLastName}
          />
        </div>
        <div className="space-y-2">
          <FormInput
            label="Cargo"
            name="position"
            placeholder="Ej: Gerente de Operaciones"
            value={formik.values.position}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.position}
          />
        </div>
        <div className="space-y-2">
          <FormInput
            label="Teléfono"
            name="phone"
            type="tel"
            placeholder="Ej: +51 999 999 999"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.phone}
          />
        </div>
        <div className="space-y-2">
          <FormSelect
            label="Rol del Usuario"
            name="idRole"
            placeholder="Seleccione el rol"
            value={formik.values.idRole.toString()}
            options={roleData || []}
            onChange={formik.handleChange}
            helperText={formik.errors.idRole}
          />
        </div>
        <div className="space-y-2">
          <FormSelect
            label="Área Asignada"
            name="idArea"
            placeholder="Seleccione el área"
            value={formik.values.idArea.toString()}
            options={areaData || []}
            onChange={formik.handleChange}
            helperText={formik.errors.idArea}
          />
        </div>
      </div>
    </CardForm>
  );
};
